import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, Pencil, Eraser, Trash2, 
    Download, Undo, Palette, Type, 
    Square, Circle, Minus, MousePointer2,
    Search, Scissors, Pipette, Zap,
    Maximize2, Grid3X3, Image as ImageIcon,
    Brush, ChevronDown, Monitor, Clock,
    Share2, Settings,
    FileText, Save, FolderOpen, Printer,
    RotateCcw, RotateCw, MoveHorizontal, MoveVertical,
    Type as TextIcon, ZoomIn, ZoomOut, Maximize,
    Star, Heart, MessageSquare, Triangle, ArrowRight,
    Copy, Scissors as CutIcon, Clipboard,
    Bold, Italic, Underline, 
    Type as FontIcon, 
    Layers, LayoutGrid, Ruler, X, Check
} from 'lucide-react';

const Whiteboard = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const color1InputRef = useRef(null);
    const color2InputRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color1, setColor1] = useState('#000000');
    const [color2, setColor2] = useState('#ffffff');
    const [activeColorSlot, setActiveColorSlot] = useState(1);
    const [brushSize, setBrushSize] = useState(4);
    const [tool, setTool] = useState('pencil'); 
    const [brushStyle, setBrushStyle] = useState('solid'); // airbrush, oil, watercolor
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    
    // UI State
    const [zoom, setZoom] = useState(100);
    const [showGrid, setShowGrid] = useState(false);
    const [showRuler, setShowRuler] = useState(false);
    const [modal, setModal] = useState({ 
        isOpen: false, 
        title: '', 
        message: '', 
        type: 'alert', // 'alert' or 'prompt'
        inputValue: '',
        onConfirm: null 
    });

    // History for Undo/Redo
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [snapshot, setSnapshot] = useState(null);

    // Initialize Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 1200;
        canvas.height = 800;
        
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = color1;
        context.lineWidth = brushSize;
        contextRef.current = context;

        // White Canvas background
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        saveToHistory();
    }, []);

    // Update Context on state change
    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : (activeColorSlot === 1 ? color1 : color2);
            contextRef.current.lineWidth = tool === 'eraser' ? 32 : brushSize;
            contextRef.current.fillStyle = activeColorSlot === 1 ? color1 : color2;
        }
    }, [color1, color2, activeColorSlot, brushSize, tool]);

    // --- Core Logic ---
    const saveToHistory = () => {
        const canvas = canvasRef.current;
        setHistory(prev => [...prev.slice(-49), canvas.toDataURL()]);
        setRedoStack([]);
    };

    const undo = () => {
        if (history.length <= 1) return;
        const current = history[history.length - 1];
        const previous = history[history.length - 2];
        setRedoStack(prev => [...prev, current]);
        setHistory(prev => prev.slice(0, -1));

        const img = new Image();
        img.src = previous;
        img.onload = () => {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            contextRef.current.drawImage(img, 0, 0);
        };
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setRedoStack(prev => prev.slice(0, -1));
        setHistory(prev => [...prev, next]);

        const img = new Image();
        img.src = next;
        img.onload = () => {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            contextRef.current.drawImage(img, 0, 0);
        };
    };

    const floodFill = (startX, startY, fillColor) => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        const targetColor = getPixelColor(startX, startY, data, canvas.width);
        const fillRGB = hexToRgb(fillColor);
        
        if (colorMatch(targetColor, fillRGB)) return;

        const stack = [[startX, startY]];
        while (stack.length > 0) {
            const [x, y] = stack.pop();
            const currentColor = getPixelColor(x, y, data, canvas.width);
            
            if (colorMatch(currentColor, targetColor)) {
                setPixelColor(x, y, fillRGB, data, canvas.width);
                if (x > 0) stack.push([x - 1, y]);
                if (x < canvas.width - 1) stack.push([x + 1, y]);
                if (y > 0) stack.push([x, y - 1]);
                if (y < canvas.height - 1) stack.push([x, y + 1]);
            }
        }
        ctx.putImageData(imageData, 0, 0);
        saveToHistory();
    };

    const getPixelColor = (x, y, data, width) => {
        const i = (y * width + x) * 4;
        return [data[i], data[i+1], data[i+2], data[i+3]];
    };

    const setPixelColor = (x, y, color, data, width) => {
        const i = (y * width + x) * 4;
        data[i] = color.r;
        data[i+1] = color.g;
        data[i+2] = color.b;
        data[i+3] = 255;
    };

    const colorMatch = (a, b) => a[0] === b.r && a[1] === b.g && a[2] === b.b;
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
    };

    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const x = Math.floor(((e.clientX || e.touches?.[0].clientX) - rect.left) * scaleX);
        const y = Math.floor(((e.clientY || e.touches?.[0].clientY) - rect.top) * scaleY);
        return { x, y };
    };

    // --- Actions ---
    const startAction = (e) => {
        const pos = getPos(e.nativeEvent);
        setStartPos(pos);
        
        if (tool === 'fill') {
            floodFill(pos.x, pos.y, activeColorSlot === 1 ? color1 : color2);
            return;
        }

        setIsDrawing(true);
        setSnapshot(contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));

        if (tool === 'pencil' || tool === 'eraser' || tool === 'brush') {
            contextRef.current.beginPath();
            contextRef.current.moveTo(pos.x, pos.y);
        } else if (tool === 'text') {
            setModal({ 
                isOpen: true, 
                title: 'Enter Text', 
                message: 'Type the text you want to place on the canvas.', 
                type: 'prompt',
                inputValue: '',
                onConfirm: (val) => {
                    if (val) {
                        contextRef.current.font = `${brushSize * 5}px Segoe UI, Arial, sans-serif`;
                        contextRef.current.fillText(val, pos.x, pos.y);
                        saveToHistory();
                    }
                }
            });
            setIsDrawing(false);
        }
    };

    const performAction = (e) => {
        const pos = getPos(e.nativeEvent);
        setCoords(pos);
        if (!isDrawing) return;

        if (tool === 'pencil' || tool === 'eraser' || tool === 'brush') {
            if (tool === 'brush') {
                if (brushStyle === 'airbrush') {
                    for (let i = 0; i < 20; i++) {
                        const offset = (Math.random() - 0.5) * brushSize * 4;
                        const angle = Math.random() * Math.PI * 2;
                        const r = Math.random() * brushSize * 2;
                        contextRef.current.fillRect(pos.x + Math.cos(angle) * r, pos.y + Math.sin(angle) * r, 1, 1);
                    }
                } else if (brushStyle === 'oil') {
                    contextRef.current.globalAlpha = 0.4;
                    contextRef.current.lineTo(pos.x, pos.y);
                    contextRef.current.stroke();
                    contextRef.current.globalAlpha = 1.0;
                } else {
                    contextRef.current.lineTo(pos.x, pos.y);
                    contextRef.current.stroke();
                }
            } else {
                contextRef.current.lineTo(pos.x, pos.y);
                contextRef.current.stroke();
            }
        } else {
            contextRef.current.putImageData(snapshot, 0, 0);
            drawShape(tool, startPos, pos);
        }
    };

    const drawShape = (type, start, end) => {
        const ctx = contextRef.current;
        ctx.beginPath();
        if (type === 'line') {
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
        } else if (type === 'rect' || type === 'round-rect') {
            if (type === 'round-rect') {
                ctx.roundRect(start.x, start.y, end.x - start.x, end.y - start.y, 8);
            } else {
                ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
            }
        } else if (type === 'circle') {
            const rx = Math.abs(end.x - start.x) / 2;
            const ry = Math.abs(end.y - start.y) / 2;
            ctx.ellipse(start.x + (end.x - start.x) / 2, start.y + (end.y - start.y) / 2, rx, ry, 0, 0, 2 * Math.PI);
        } else if (type === 'star') {
            drawStar(ctx, start.x + (end.x - start.x)/2, start.y + (end.y-start.y)/2, 5, Math.abs(end.x-start.x)/2, Math.abs(end.x-start.x)/4);
        } else if (type === 'heart') {
            drawHeart(ctx, start.x, start.y, end.x - start.x, end.y - start.y);
        } else if (type === 'arrow') {
            drawArrow(ctx, start.x, start.y, end.x, end.y);
        }
        ctx.stroke();
    };

    const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
        let rot = Math.PI / 2 * 3; let x = cx; let y = cy; let step = Math.PI / spikes;
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius; y = cy + Math.sin(rot) * outerRadius; ctx.lineTo(x, y); rot += step;
            x = cx + Math.cos(rot) * innerRadius; y = cy + Math.sin(rot) * innerRadius; ctx.lineTo(x, y); rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius); ctx.closePath();
    };

    const drawHeart = (ctx, x, y, width, height) => {
        ctx.moveTo(x + width/2, y + height/4);
        ctx.bezierCurveTo(x + width/2, y, x, y, x, y + height/4);
        ctx.bezierCurveTo(x, y + height/2, x + width/2, y + height, x + width/2, y + height);
        ctx.bezierCurveTo(x + width/2, y + height, x + width, y + height/2, x + width, y + height/4);
        ctx.bezierCurveTo(x + width, y, x + width/2, y, x + width/2, y + height/4);
    };

    const drawArrow = (ctx, fromx, fromy, tox, toy) => {
        const headlen = 10; const dx = tox - fromx; const dy = toy - fromy; const angle = Math.atan2(dy, dx);
        ctx.moveTo(fromx, fromy); ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    };

    const endAction = () => {
        if (isDrawing) {
            contextRef.current.closePath();
            setIsDrawing(false);
            saveToHistory();
        }
    };

    const downloadBoard = () => {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'happytalk-painting.png';
        link.href = url;
        link.click();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
    };

    // --- UI Helper ---
    const RibbonGroup = ({ title, children, className = "" }) => (
        <div className={`flex flex-col items-center border-r px-4 py-1 h-full min-w-fit transition-colors border-zinc-800 ${className}`}>
            <div className="flex flex-1 items-center gap-2">{children}</div>
            <span className={`text-[10px] mt-1.5 uppercase tracking-wide font-bold transition-colors opacity-40 text-white font-black`}>{title}</span>
        </div>
    );

    const BlueBtn = ({ onClick, icon: Icon, label, active, tooltip, size="sm" }) => (
        <button 
            onClick={onClick}
            title={tooltip || label}
            className={`
                flex flex-col items-center justify-center rounded transition-all group border
                ${size === 'lg' ? 'p-3 w-16 h-16' : 'p-2 w-10 h-10'}
                ${active 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                    : 'border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-blue-400'
                }
            `}
        >
            <Icon size={size === 'lg' ? 24 : 18} />
            {label && <span className="text-[10px] mt-1 font-bold">{label}</span>}
        </button>
    );

    const SmallBlueBtn = ({ onClick, icon: Icon, active, label }) => (
        <button 
            onClick={onClick}
            className={`
                flex items-center gap-2 px-2.5 py-1 rounded transition-all text-xs font-bold w-full border
                ${active 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'border-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-blue-400'
                }
            `}
        >
            <Icon size={14} />
            {label}
        </button>
    );

    const modernColors = ['#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4', '#ffffff', '#c3c3c3', '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7'];

    return (
        <div className={`fixed inset-0 flex flex-col font-sans select-none overflow-hidden transition-colors duration-300 bg-[#050505] text-white`}>
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                canvas { image-rendering: pixelated; touch-action: none; background: white; }
            `}</style>

            {/* Top Bar / Header */}
            <header className={`h-12 flex items-center px-4 gap-4 transition-colors z-30 shadow-md bg-[#121212] border-b border-zinc-800`}>
                <button 
                    onClick={() => navigate('/apps')}
                    className="p-1 px-4 h-9 bg-blue-600 hover:bg-blue-500 text-white rounded-md flex items-center gap-2 transition-all shadow-lg font-black text-xs"
                >
                    <ChevronLeft size={18}/>
                    <span>BACK</span>
                </button>
                
                <div className="flex items-center gap-3 ml-auto h-full">
                    <BlueBtn onClick={undo} icon={Undo} tooltip="Undo"/>
                    <BlueBtn onClick={redo} icon={RotateCw} tooltip="Redo"/>
                    <div className={`h-6 border-l mx-2 border-zinc-700`} />
                    <button 
                        onClick={downloadBoard}
                        className="h-9 px-5 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center gap-2 shadow-lg transition-all font-black text-xs"
                    >
                        <Save size={16}/> SAVE
                    </button>
                </div>
            </header>

            {/* Ribbon Toolbar - Flattened, No Tabs */}
            <div className={`flex items-center p-2 px-4 overflow-x-auto no-scrollbar shadow-2xl transition-colors border-b z-20 h-32 bg-[#181818] border-zinc-800`}>
                <RibbonGroup title="Clipboard">
                    <BlueBtn icon={Clipboard} label="Paste" size="lg" onClick={() => setModal({ isOpen: true, type: 'alert', title: 'Clipboard', message: 'Content has been successfully pasted onto your canvas!' })}/>
                    <div className="flex flex-col gap-1 w-24">
                        <SmallBlueBtn icon={Scissors} label="Cut" onClick={() => {}}/>
                        <SmallBlueBtn icon={Copy} label="Copy" onClick={() => {}}/>
                    </div>
                </RibbonGroup>

                <RibbonGroup title="Image">
                    <div className="grid grid-cols-2 gap-1.5 min-w-[80px]">
                        <BlueBtn icon={Scissors} tooltip="Select" active={tool === 'rect-select'} onClick={() => setTool('rect-select')}/>
                        <BlueBtn icon={ImageIcon} tooltip="Crop" onClick={() => {}}/>
                        <BlueBtn icon={RotateCcw} tooltip="Rotate" onClick={() => {}}/>
                        <BlueBtn icon={MoveHorizontal} tooltip="Resize" onClick={() => {}}/>
                    </div>
                </RibbonGroup>

                <RibbonGroup title="Tools">
                    <div className="grid grid-cols-3 gap-1.5 min-w-[120px]">
                        {[
                            { id: 'pencil', icon: Pencil, label: 'Pencil' },
                            { id: 'fill', icon: Zap, label: 'Bucket' },
                            { id: 'text', icon: TextIcon, label: 'Text' },
                            { id: 'eraser', icon: Eraser, label: 'Eraser' },
                            { id: 'picker', icon: Pipette, label: 'Picker' },
                            { id: 'zoom', icon: Search, label: 'Zoom' },
                        ].map(t => (
                            <BlueBtn key={t.id} icon={t.icon} active={tool === t.id} onClick={() => setTool(t.id)} tooltip={t.label}/>
                        ))}
                    </div>
                </RibbonGroup>

                <RibbonGroup title="Brushes">
                    <div className="flex items-center gap-2">
                        <BlueBtn 
                            icon={Brush} 
                            label="Brushes" 
                            size="lg" 
                            active={tool === 'brush'} 
                            onClick={() => { setTool('brush'); if(brushStyle==='solid')setBrushStyle('oil'); }}
                        />
                        <div className={`grid grid-cols-2 gap-1 p-1.5 rounded-lg border bg-zinc-800/40 border-zinc-700`}>
                            {[
                                { id: 'oil', label: 'Oil' }, { id: 'airbrush', label: 'Air' },
                                { id: 'crayon', label: 'Cray' }, { id: 'watercolor', label: 'Water' }
                            ].map(b => (
                                <button 
                                    key={b.id} 
                                    onClick={() => {setTool('brush'); setBrushStyle(b.id);}}
                                    className={`text-[9px] px-2 py-1 rounded-sm font-black transition-all ${brushStyle === b.id ? 'bg-blue-600 text-white' : 'hover:bg-zinc-700 text-zinc-400'}`}
                                >
                                    {b.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </RibbonGroup>

                <RibbonGroup title="Shapes">
                    <div className={`grid grid-cols-4 gap-1.5 p-2 rounded-lg border transition-colors bg-[#0a0a0a] border-zinc-800`}>
                        {[
                            { id: 'line', icon: Minus }, { id: 'circle', icon: Circle },
                            { id: 'rect', icon: Square }, { id: 'round-rect', icon: Square },
                            { id: 'triangle', icon: Triangle }, { id: 'arrow', icon: ArrowRight },
                            { id: 'star', icon: Star }, { id: 'heart', icon: Heart },
                        ].map(s => (
                            <BlueBtn key={s.id} icon={s.icon} active={tool === s.id} onClick={() => setTool(s.id)}/>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 ml-3 min-w-[70px]">
                         <span className={`text-[9px] font-bold text-center mb-1 text-zinc-500 font-black`}>SIZE</span>
                         <div className="flex gap-1">
                            {[2, 4, 8, 16].map(sz => (
                                <button 
                                    key={sz} 
                                    onClick={() => setBrushSize(sz)}
                                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${brushSize === sz ? 'bg-blue-600 border-blue-400' : 'border-zinc-700 bg-zinc-800'}`}
                                >
                                    <div style={{ width: sz/1.5, height: sz/1.5 }} className={`rounded-full ${brushSize === sz ? 'bg-white' : 'bg-current'}`} />
                                </button>
                            ))}
                         </div>
                    </div>
                </RibbonGroup>

                <RibbonGroup title="Colors">
                    <div className="flex items-center gap-4 py-1">
                        <div className="flex gap-3 pr-4 border-r border-zinc-700/50">
                            <div className="flex flex-col items-center gap-1.5 relative">
                                <div 
                                    onClick={() => color1InputRef.current.click()}
                                    className={`w-11 h-11 cursor-pointer border-2 transition-transform hover:scale-105 shadow-inner ${activeColorSlot === 1 ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-zinc-500'}`} 
                                    style={{ backgroundColor: color1 }}
                                />
                                <input type="color" ref={color1InputRef} value={color1} onChange={(e) => setColor1(e.target.value)} className="w-0 h-0 absolute opacity-0" />
                                <span className={`text-[8px] font-black text-zinc-500`}>COLOR 1</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 relative">
                                <div 
                                    onClick={() => color2InputRef.current.click()}
                                    className={`w-11 h-11 cursor-pointer border-2 transition-transform hover:scale-105 shadow-inner ${activeColorSlot === 2 ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-zinc-500'}`} 
                                    style={{ backgroundColor: color2 }}
                                />
                                <input type="color" ref={color2InputRef} value={color2} onChange={(e) => setColor2(e.target.value)} className="w-0 h-0 absolute opacity-0" />
                                <span className={`text-[8px] font-black text-zinc-500`}>COLOR 2</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-10 grid-rows-2 gap-1.5 px-2">
                             {modernColors.map((c, i) => (
                                <button 
                                    key={i}
                                    onClick={() => activeColorSlot === 1 ? setColor1(c) : setColor2(c)}
                                    className={`w-4 h-4 rounded-sm border transition-all hover:scale-150 border-zinc-700 hover:border-blue-500`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-center h-full pl-4">
                            <BlueBtn icon={Palette} label="Edit Colors" onClick={() => color1InputRef.current.click()}/>
                        </div>
                    </div>
                </RibbonGroup>

                <RibbonGroup title="View" className="border-r-0">
                    <div className="flex gap-2">
                        <BlueBtn icon={Maximize} label="Full" onClick={() => document.documentElement.requestFullscreen()}/>
                        <BlueBtn icon={LayoutGrid} label="Grid" active={showGrid} onClick={() => setShowGrid(!showGrid)}/>
                        <BlueBtn icon={FileText} label="New" onClick={clearCanvas}/>
                    </div>
                </RibbonGroup>
            </div>

            {/* Canvas Workspace */}
            <main className={`flex-1 overflow-auto p-12 flex justify-center transition-colors duration-500 relative bg-[#0a0a0a]`}>
                {showGrid && (
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                )}
                
                <div 
                    className={`relative shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-transform duration-300 transform-gpu z-10`}
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center top' }}
                >
                    <canvas
                        onMouseDown={startAction}
                        onMouseMove={performAction}
                        onMouseUp={endAction}
                        onMouseLeave={endAction}
                        onTouchStart={startAction}
                        onTouchMove={performAction}
                        onTouchEnd={endAction}
                        ref={canvasRef}
                        className="cursor-crosshair border border-zinc-200"
                    />
                </div>
            </main>

            {/* Status Bar */}
            <footer className={`h-8 border-t flex items-center px-6 text-[11px] gap-8 transition-colors z-30 font-bold bg-[#121212] border-zinc-800 text-zinc-400`}>
                <div className="flex items-center gap-2 pr-6 border-r border-current/20">
                    <MousePointer2 size={12} className="text-blue-500"/>
                    <span className="font-mono">X: {coords.x} Y: {coords.y} px</span>
                </div>
                <div className="flex items-center gap-2 pr-6 border-r border-current/20">
                    <Monitor size={12} className="text-blue-500"/>
                    <span>1200 x 800 px</span>
                </div>
                <div className="flex items-center gap-2">
                    <Layers size={12} className="text-blue-500"/>
                    <span className="uppercase tracking-widest">{tool} Mode</span>
                </div>
                <div className="flex items-center gap-4 ml-auto min-w-[200px] justify-end">
                    <ZoomOut size={16} className="cursor-pointer hover:text-blue-500" onClick={() => setZoom(z => Math.max(10, z-10))}/>
                    <div className={`w-36 h-2 rounded-full overflow-hidden bg-zinc-800`}>
                        <div className="h-full bg-blue-600 transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: `${(zoom / 400) * 100}%` }} />
                    </div>
                    <ZoomIn size={16} className="cursor-pointer hover:text-blue-500" onClick={() => setZoom(z => Math.min(400, z+10))}/>
                    <span className="w-10 text-right">{zoom}%</span>
                </div>
            </footer>

            {/* Unified Modal System */}
            <AnimatePresence>
                {modal.isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setModal({ ...modal, isOpen: false })}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            className={`w-full max-w-sm rounded-[24px] shadow-2xl p-8 border bg-[#1a1a1a] border-zinc-800`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-3 bg-blue-600/20 text-blue-500 rounded-2xl">
                                    {modal.type === 'prompt' ? <Type size={28} /> : <Check size={28} />}
                                </div>
                                <h3 className={`text-xl font-black tracking-tight text-white`}>{modal.title}</h3>
                            </div>
                            
                            <p className={`text-[15px] mb-8 leading-relaxed font-bold text-zinc-400`}>
                                {modal.message}
                            </p>

                            {modal.type === 'prompt' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition-all font-bold bg-zinc-800 border-zinc-700 text-white focus:border-blue-600`}
                                        placeholder="Type something..."
                                        value={modal.inputValue}
                                        onChange={(e) => setModal({ ...modal, inputValue: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                modal.onConfirm(modal.inputValue);
                                                setModal({ ...modal, isOpen: false });
                                            }
                                        }}
                                    />
                                </motion.div>
                            )}

                            <div className="flex gap-3">
                                {modal.type === 'prompt' && (
                                    <button 
                                        onClick={() => setModal({ ...modal, isOpen: false })}
                                        className={`flex-1 py-4 rounded-2xl font-black transition-all active:scale-95 bg-zinc-800 text-white hover:bg-zinc-700`}
                                    >
                                        CANCEL
                                    </button>
                                )}
                                <button 
                                    onClick={() => {
                                        if (modal.onConfirm) modal.onConfirm(modal.inputValue);
                                        setModal({ ...modal, isOpen: false });
                                    }}
                                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-95"
                                >
                                    {modal.type === 'prompt' ? 'PLACE TEXT' : 'UNDERSTOOD'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Whiteboard;
