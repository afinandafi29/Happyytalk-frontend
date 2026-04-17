import os
import random
import json

# Use absolute path or path relative to the script location
script_dir = os.path.dirname(os.path.abspath(__file__))
base_path = os.path.join(script_dir, "../../public/profiles")

if not os.path.exists(base_path):
    # Fallback for different execution environments
    base_path = "social-network-/social-network-react/public/profiles"

files = os.listdir(base_path)
# Filter for image files
image_files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]

# List of realistic names
first_names = ["Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "Lucas", "Mia", "Aiden", "Charlotte", "Logan", "Amelia", "James", "Harper", "Jacob", "Evelyn", "Michael", "Abigail", "Benjamin", "Emily", "Elijah", "Elizabeth", "Daniel", "Mila", "Matthew", "Ella", "Jackson", "Sofia", "Aria", "Avery", "Scarlett", "Layla", "Chloe", "Madison", "Elena", "Maya", "Aurora", "Oliver", "Sebastian", "Elias", "Levi", "David", "Wyatt", "Carter", "Julian", "Leo"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"]


# Pools for dynamic generation
room_titles = [
    "Beginner’s First Steps", "Newbie Language Lounge", "I’m New Here – Let’s Learn!",
    "Absolute Beginner Corner", "Hello World – Language Starters", "Fresh Start Language Room",
    "Zero to Hero Beginners", "Just Started Learning", "New Learner Hub", "Beginner Buddies",
    "First Words Club", "I’m a Beginner Too!", "Super Newbie Zone", "Learning from Scratch",
    "Welcome New Learners", "No Experience Needed", "Beginner Friendly Chat", "My First 100 Words",
    "Gentle Beginners Room", "Newbie Safe Space", "Starting from Zero", "Language Newbies Unite",
    "Beginner’s Happy Place", "Total Beginner Hangout", "Easy Peasy Beginners", "Slow & Steady Learners",
    "Beginner Vibes Only", "First-Time Learners", "Super Simple Starters", "Learning the Basics",
    "New Learner Lounge", "A1 Level Friends", "Complete Newbie Nest", "Let’s Begin Together",
    "Rookie Language Room", "Beginner’s Bootcamp", "Tiny Steps Language Room", "Newbie Night Vibes"
]

topics_pool = [
    "Practice basic greetings and introductions in a friendly environment.",
    "Discuss your favorite movies and series while improving your fluency.",
    "Master the essential nouns and verbs for daily survival conversation.",
    "A safe space to make mistakes and learn from them together.",
    "Professional communication and business etiquette practice.",
    "Travel tips and essential phrases for your next global adventure.",
    "Informal hangout to talk about literally anything in your target language.",
    "Focusing on phonetic accuracy and natural intonation patterns."
]

languages = ["English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese", "Hindi", "Arabic", "Russian", "Portuguese", "Italian", "Turkish", "Vietnamese", "Thai"]
levels = ["Beginner (A1)", "Elementary (A2)", "Intermediate (B1)", "Upper Intermediate (B2)", "Advanced (C1)", "Native Speaker"]

image_pool = list(image_files)
random.shuffle(image_pool)
image_index = 0

def get_next_avatar():
    global image_index, image_pool
    if image_index >= len(image_pool):
        # Even if we run out, we shuffle and restart, but for 50 rooms we should be fine
        random.shuffle(image_pool)
        image_index = 0
    img = image_pool[image_index]
    image_index += 1
    return f"/profiles/{img}"

def get_random_person(id_val):
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    return {
        "id": f"p{id_val}",
        "name": name,
        "username": name.lower().replace(" ", "_") + "_" + str(random.randint(10, 99)),
        "avatar_url": get_next_avatar()
    }

rooms = []
random.shuffle(room_titles)

# Use 50 rooms to use almost all unique images
total_rooms = 50
for i in range(1, total_rooms + 1):
    lang = random.choice(languages)
    title = random.choice(room_titles)
    if i <= len(room_titles):
        title = room_titles[i-1]
    
    rooms.append({
        "id": f"room-{i}",
        "title": f"{title} ({lang})",
        "topic": random.choice(topics_pool),
        "language": lang,
        "level": random.choice(levels),
        "is_private": False,
        "created_by": "system",
        "creator": get_random_person(f"c{i}"),
        "people": [get_random_person(f"{i}_{j}") for j in range(random.randint(4, 9))]
    })

# Write directly to mockRooms.js
output_file = os.path.join(script_dir, "mockRooms.js")
with open(output_file, 'w') as f:
    f.write("export const mockRooms = " + json.dumps(rooms, indent=4) + ";\n")

print(f"Successfully generated {total_rooms} rooms with unique avatars.")

