
// ============================================================================
// MEGA-BOT AI ENGINE - REAL ARTIFICIAL INTELLIGENCE SYSTEM
// ============================================================================

export class TFIDFAnalyzer {
    constructor() {
        this.documents = [];
        this.vocabulary = new Set();
        this.idf = {};
        this.documentFrequency = {};
    }

    addDocument(text, docId) {
        const tokens = this.tokenize(text);
        this.documents.push({ id: docId, tokens, text });
        
        tokens.forEach(token => {
            this.vocabulary.add(token);
            this.documentFrequency[token] = (this.documentFrequency[token] || 0) + 1;
        });
    }

    tokenize(text) {
        if (!text) return [];
        return text.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(t => t.length > 2);
    }

    calculateIDF() {
        const totalDocs = this.documents.length;
        this.vocabulary.forEach(term => {
            const docsWithTerm = this.documentFrequency[term] || 1;
            this.idf[term] = Math.log(totalDocs / docsWithTerm);
        });
    }

    calculateTF(tokens) {
        const tf = {};
        const total = tokens.length;
        tokens.forEach(token => {
            tf[token] = (tf[token] || 0) + 1 / total;
        });
        return tf;
    }

    calculateTFIDF(text) {
        const tokens = this.tokenize(text);
        const tf = this.calculateTF(tokens);
        const tfidf = {};
        
        tokens.forEach(token => {
            tfidf[token] = (tf[token] || 0) * (this.idf[token] || 0);
        });
        
        return tfidf;
    }

    cosineSimilarity(vec1, vec2) {
        const allKeys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;
        
        allKeys.forEach(key => {
            const v1 = vec1[key] || 0;
            const v2 = vec2[key] || 0;
            dotProduct += v1 * v2;
            norm1 += v1 * v1;
            norm2 += v2 * v2;
        });
        
        const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
        return denominator === 0 ? 0 : dotProduct / denominator;
    }

    findMostSimilarDocuments(query, topK = 5) {
        const queryTFIDF = this.calculateTFIDF(query);
        const similarities = this.documents.map(doc => ({
            id: doc.id,
            text: doc.text,
            similarity: this.cosineSimilarity(queryTFIDF, this.calculateTFIDF(doc.text))
        }));
        
        return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
    }
}

export class WordEmbedding {
    constructor() {
        this.embeddings = new Map();
        this.vocabulary = new Set();
        this.initializeEmbeddings();
    }

    initializeEmbeddings() {
        const semanticRelations = {
            'hello': [0.9, 0.1, 0.2, 0.3, 0.1],
            'hi': [0.85, 0.15, 0.25, 0.25, 0.1],
            'greetings': [0.95, 0.05, 0.1, 0.4, 0.05],
            'good': [0.8, 0.9, 0.7, 0.6, 0.3],
            'great': [0.85, 0.92, 0.75, 0.65, 0.35],
            'excellent': [0.9, 0.95, 0.8, 0.7, 0.4],
            'bad': [0.2, 0.1, 0.8, 0.9, 0.8],
            'terrible': [0.15, 0.05, 0.9, 0.95, 0.9],
            'help': [0.5, 0.7, 0.3, 0.2, 0.6],
            'assist': [0.55, 0.65, 0.35, 0.25, 0.55],
            'question': [0.6, 0.3, 0.5, 0.4, 0.2],
            'ask': [0.65, 0.35, 0.45, 0.35, 0.25],
            'what': [0.7, 0.2, 0.4, 0.3, 0.1],
            'how': [0.68, 0.22, 0.42, 0.32, 0.12],
            'why': [0.72, 0.18, 0.38, 0.28, 0.08],
            'when': [0.65, 0.25, 0.35, 0.45, 0.15],
            'where': [0.63, 0.27, 0.37, 0.43, 0.17],
            'programming': [0.3, 0.8, 0.2, 0.1, 0.9],
            'code': [0.35, 0.85, 0.25, 0.15, 0.88],
            'javascript': [0.32, 0.87, 0.22, 0.12, 0.92],
            'python': [0.33, 0.86, 0.23, 0.13, 0.91],
            'math': [0.4, 0.5, 0.3, 0.6, 0.2],
            'algebra': [0.42, 0.52, 0.32, 0.62, 0.22],
            'geometry': [0.38, 0.48, 0.28, 0.58, 0.18],
            'science': [0.5, 0.6, 0.4, 0.7, 0.3],
            'physics': [0.52, 0.62, 0.42, 0.72, 0.32],
            'chemistry': [0.48, 0.58, 0.38, 0.68, 0.28],
            'biology': [0.51, 0.61, 0.41, 0.71, 0.31],
            'history': [0.7, 0.3, 0.5, 0.4, 0.2],
            'ancient': [0.72, 0.28, 0.48, 0.42, 0.22],
            'modern': [0.68, 0.32, 0.52, 0.38, 0.18],
            'business': [0.4, 0.6, 0.3, 0.5, 0.7],
            'economics': [0.42, 0.58, 0.32, 0.52, 0.68],
            'money': [0.35, 0.65, 0.25, 0.45, 0.75],
            'health': [0.6, 0.4, 0.7, 0.3, 0.4],
            'fitness': [0.58, 0.42, 0.68, 0.32, 0.42],
            'exercise': [0.56, 0.44, 0.66, 0.34, 0.44],
            'sport': [0.55, 0.45, 0.65, 0.35, 0.45],
            'art': [0.7, 0.2, 0.6, 0.3, 0.5],
            'music': [0.68, 0.22, 0.58, 0.32, 0.52],
            'poetry': [0.72, 0.18, 0.62, 0.28, 0.48],
            'literature': [0.75, 0.15, 0.65, 0.25, 0.45],
            'travel': [0.5, 0.3, 0.4, 0.8, 0.6],
            'geography': [0.52, 0.28, 0.42, 0.82, 0.58],
            'country': [0.48, 0.32, 0.38, 0.78, 0.62],
            'technology': [0.3, 0.85, 0.15, 0.1, 0.9],
            'artificial': [0.25, 0.9, 0.1, 0.05, 0.95],
            'intelligence': [0.28, 0.88, 0.12, 0.08, 0.92],
            'machine': [0.32, 0.83, 0.18, 0.12, 0.85],
            'learning': [0.35, 0.8, 0.2, 0.15, 0.82]
        };

        Object.entries(semanticRelations).forEach(([word, embedding]) => {
            this.embeddings.set(word, embedding);
            this.vocabulary.add(word);
        });
    }

    getEmbedding(word) {
        if (this.embeddings.has(word)) {
            return this.embeddings.get(word);
        }
        return this.generateEmbedding(word);
    }

    generateEmbedding(word) {
        const seed = this.hashWord(word);
        const embedding = [];
        for (let i = 0; i < 5; i++) {
            embedding.push(Math.sin(seed * (i + 1)) * 0.5 + 0.5);
        }
        return embedding;
    }

    hashWord(word) {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            const char = word.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    cosineSimilarity(vec1, vec2) {
        if (!vec1 || !vec2 || vec1.length === 0 || vec2.length === 0) return 0;
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;
        for (let i = 0; i < Math.min(vec1.length, vec2.length); i++) {
            dotProduct += vec1[i] * vec2[i];
            norm1 += vec1[i] * vec1[i];
            norm2 += vec2[i] * vec2[i];
        }
        const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
        return denominator === 0 ? 0 : dotProduct / denominator;
    }

    sentenceEmbedding(sentence) {
        const words = sentence.toLowerCase().split(/\s+/);
        const embeddings = words.map(w => this.getEmbedding(w));
        if (embeddings.length === 0) return [0, 0, 0, 0, 0];
        const result = [0, 0, 0, 0, 0];
        embeddings.forEach(emb => {
            for (let i = 0; i < 5; i++) {
                result[i] += emb[i];
            }
        });
        for (let i = 0; i < 5; i++) result[i] /= embeddings.length;
        return result;
    }
}

export class KnowledgeGraph {
    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
        this.initializeGraph();
    }

    initializeGraph() {
        this.addNode('programming', 'Programming is the art of writing code');
        this.addNode('javascript', 'JavaScript is a web programming language');
        this.addNode('python', 'Python is a general-purpose programming language');
        this.addNode('web-development', 'Creating websites and web applications');
        this.addNode('frontend', 'User interface and experience layer');
        this.addNode('backend', 'Server-side logic and database layer');
        this.addNode('mathematics', 'The science of numbers and equations');
        this.addNode('science', 'Systematic study of the structure and behavior of the physical and natural world');
        this.addNode('health', 'Physical and mental well-being');
        this.addNode('art', 'Creative expression through visual media');
        this.addNode('artificial-intelligence', 'Intelligent machines and systems');
        this.addNode('machine-learning', 'Systems that learn from data');

        this.addEdge('programming', 'javascript', 'is-a');
        this.addEdge('programming', 'python', 'is-a');
        this.addEdge('javascript', 'web-development', 'used-in');
        this.addEdge('web-development', 'frontend', 'part-of');
        this.addEdge('web-development', 'backend', 'part-of');
        this.addEdge('artificial-intelligence', 'machine-learning', 'includes');
    }

    addNode(nodeId, description) {
        this.nodes.set(nodeId, { id: nodeId, description: description });
    }

    addEdge(fromNode, toNode, relationship) {
        const key = `${fromNode}->${toNode}`;
        this.edges.set(key, { from: fromNode, to: toNode, relationship: relationship });
    }

    findRelatedNodes(nodeId, depth = 2) {
        const related = new Set();
        const visited = new Set();
        const queue = [[nodeId, 0]];
        while (queue.length > 0) {
            const [current, currentDepth] = queue.shift();
            if (visited.has(current) || currentDepth >= depth) continue;
            visited.add(current);
            this.edges.forEach((edge) => {
                if (edge.from === current) {
                    related.add(edge.to);
                    if (currentDepth < depth - 1) queue.push([edge.to, currentDepth + 1]);
                }
                if (edge.to === current) {
                    related.add(edge.from);
                    if (currentDepth < depth - 1) queue.push([edge.from, currentDepth + 1]);
                }
            });
        }
        return Array.from(related);
    }
}

export class KnowledgeEncyclopedia {
    constructor() {
        this.topics = {
            'mathematics': {
                algebra: `Algebra is a fundamental branch of mathematics dealing with symbols, equations, and abstract relationships...`,
                geometry: `Geometry is the branch of mathematics studying shapes, sizes, and spatial relationships...`,
                calculus: `Calculus is the mathematics of change, dealing with rates and accumulation...`,
                statistics: `Statistics is the science of data collection, analysis, and interpretation...`
            },
            'science': {
                physics: `Physics is the fundamental natural science studying matter, energy, and forces...`,
                chemistry: `Chemistry is the science of atoms, molecules, and their reactions...`,
                biology: `Biology is the science of life and living organisms...`,
                astronomy: `Astronomy is the study of celestial objects and space...`
            },
            'technology': {
                'web-development': `Web development creates websites and web applications using frontend and backend technologies...`,
                javascript: `JavaScript is a versatile programming language for web development and beyond...`,
                python: `Python is a versatile language for web development, data science, and more...`,
                databases: `Databases store and retrieve data efficiently and reliably...`
            }
        };
    }

    getTopic(category, topic) {
        return this.topics[category]?.[topic] || null;
    }

    searchTopics(query) {
        const results = [];
        const queryLower = query.toLowerCase();
        Object.entries(this.topics).forEach(([category, topics]) => {
            Object.entries(topics).forEach(([topic, content]) => {
                if (topic.includes(queryLower) || content.toLowerCase().includes(queryLower)) {
                    results.push({ category, topic, excerpt: content.substring(0, 200) });
                }
            });
        });
        return results;
    }
}

export class ContextManager {
    constructor() {
        this.conversationContext = [];
        this.entityMentions = new Map();
        this.topicHistory = [];
        this.sentiment = 'neutral';
    }

    addToContext(role, content) {
        this.conversationContext.push({ role, content, timestamp: Date.now() });
        if (this.conversationContext.length > 20) this.conversationContext.shift();
    }

    updateEntityMentions(text) {
        const entities = text.toLowerCase().split(/\s+/).filter(t => t.length > 4);
        entities.forEach(entity => {
            this.entityMentions.set(entity, (this.entityMentions.get(entity) || 0) + 1);
        });
    }
}

export class IntentClassifier {
    constructor() {
        this.intentPatterns = {
            'greeting': {
                keywords: ['hello', 'hi', 'hey', 'greetings'],
                responses: ['Hello! I\'m here to help. What would you like to know?', 'Hi there! What can I assist you with?']
            },
            'appreciation': {
                keywords: ['thank', 'thanks', 'grateful'],
                responses: ['You\'re welcome! Happy to help!', 'Glad I could assist!']
            }
        };
    }

    classifyIntent(text) {
        const textLower = text.toLowerCase();
        for (const [intent, data] of Object.entries(this.intentPatterns)) {
            if (data.keywords.some(k => textLower.includes(k))) return { primary: intent };
        }
        return { primary: 'unknown' };
    }

    getDefaultResponse(intent) {
        const responses = this.intentPatterns[intent]?.responses;
        return responses ? responses[Math.floor(Math.random() * responses.length)] : null;
    }
}

export class MegaBotAI {
    constructor() {
        this.tfidf = new TFIDFAnalyzer();
        this.embedding = new WordEmbedding();
        this.knowledge = new KnowledgeGraph();
        this.encyclopedia = new KnowledgeEncyclopedia();
        this.context = new ContextManager();
        this.intentClassifier = new IntentClassifier();
        this.initializeKnowledgeBase();
    }

    initializeKnowledgeBase() {
        let docId = 0;
        Object.values(this.encyclopedia.topics).forEach(catTopics => {
            Object.values(catTopics).forEach(content => {
                this.tfidf.addDocument(content, docId++);
            });
        });
        this.tfidf.calculateIDF();
    }

    findBestResponse(userInput) {
        this.context.addToContext('user', userInput);
        this.context.updateEntityMentions(userInput);
        
        const intent = this.intentClassifier.classifyIntent(userInput);
        const defaultResponse = this.intentClassifier.getDefaultResponse(intent.primary);
        if (defaultResponse) return defaultResponse;

        const searchResults = this.encyclopedia.searchTopics(userInput);
        if (searchResults.length > 0) return this.encyclopedia.getTopic(searchResults[0].category, searchResults[0].topic);

        const similarities = this.tfidf.findMostSimilarDocuments(userInput, 1);
        if (similarities[0] && similarities[0].similarity > 0.1) return similarities[0].text;

        return "I'm not quite sure about that. Could you tell me more or ask in a different way? I'm specialized in mathematics, science, and technology!";
    }
}
