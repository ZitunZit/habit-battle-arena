from PIL import Image, ImageDraw, ImageFont
import os

# Créer les dossiers si nécessaire
os.makedirs('assets/weapons', exist_ok=True)
os.makedirs('assets/powers', exist_ok=True)
os.makedirs('assets/auras', exist_ok=True)

# Couleurs
ORANGE = (255, 140, 0)
RED = (220, 20, 60)
GOLD = (255, 215, 0)
WHITE = (255, 255, 255)
BLUE = (100, 180, 255)

# === ARMES ===

def create_sword():
    img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Lame
    draw.polygon([(40, 10), (45, 60), (40, 65), (35, 60)], fill=(200, 200, 200))
    draw.line([(40, 10), (40, 65)], fill=WHITE, width=2)
    
    # Garde
    draw.rectangle([30, 60, 50, 63], fill=GOLD)
    
    # Poignée
    draw.rectangle([37, 63, 43, 73], fill=(139, 69, 19))
    
    # Pommeau
    draw.ellipse([35, 71, 45, 78], fill=GOLD)
    
    img.save('assets/weapons/sword.png')
    print("✅ Épée créée")

def create_hammer():
    img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Manche
    draw.rectangle([37, 20, 43, 70], fill=(101, 67, 33))
    
    # Tête du marteau
    draw.rectangle([25, 15, 55, 30], fill=(150, 150, 150))
    draw.rectangle([25, 15, 55, 22], fill=(180, 180, 180))
    
    img.save('assets/weapons/hammer.png')
    print("✅ Marteau créé")

def create_spear():
    img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Manche
    draw.rectangle([38, 25, 42, 75], fill=(101, 67, 33))
    
    # Pointe
    draw.polygon([(40, 5), (47, 25), (40, 22), (33, 25)], fill=(200, 200, 200))
    draw.line([(40, 5), (40, 25)], fill=WHITE, width=2)
    
    img.save('assets/weapons/spear.png')
    print("✅ Lance créée")

def create_axe():
    img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Manche
    draw.rectangle([37, 30, 43, 75], fill=(101, 67, 33))
    
    # Lame
    draw.polygon([(30, 15), (50, 15), (60, 25), (50, 35), (30, 35)], fill=(150, 150, 150))
    draw.polygon([(30, 15), (50, 15), (55, 20)], fill=(180, 180, 180))
    
    img.save('assets/weapons/axe.png')
    print("✅ Hache créée")

def create_bow():
    img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Arc
    draw.arc([20, 10, 60, 70], 270, 90, fill=(139, 69, 19), width=4)
    
    # Corde
    draw.line([(25, 15), (25, 65)], fill=(220, 220, 200), width=2)
    
    # Flèche
    draw.line([(25, 40), (50, 40)], fill=(160, 82, 45), width=3)
    draw.polygon([(50, 37), (58, 40), (50, 43)], fill=(200, 200, 200))
    
    img.save('assets/weapons/bow.png')
    print("✅ Arc créé")

def create_staff():
    img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Bâton
    draw.rectangle([37, 10, 43, 75], fill=(101, 67, 33))
    
    # Cristal au sommet
    draw.ellipse([30, 5, 50, 20], fill=(138, 43, 226))
    draw.ellipse([33, 8, 47, 17], fill=(186, 85, 211))
    
    # Éclat
    draw.ellipse([36, 10, 42, 14], fill=(255, 255, 255, 180))
    
    img.save('assets/weapons/staff.png')
    print("✅ Bâton créé")

# === POUVOIRS ===

def create_fire():
    img = Image.new('RGBA', (100, 100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Flammes (plusieurs ellipses)
    for i in range(5):
        y_offset = i * 15
        size = 60 - i * 10
        x = 50 - size // 2
        y = 70 - y_offset
        
        if i == 0:
            draw.ellipse([x, y, x + size, y + 40], fill=(255, 100, 0, 200))
        elif i == 1:
            draw.ellipse([x, y, x + size, y + 35], fill=(255, 140, 0, 180))
        elif i == 2:
            draw.ellipse([x, y, x + size, y + 30], fill=(255, 180, 0, 160))
        else:
            draw.ellipse([x, y, x + size, y + 25], fill=(255, 215, 0, 140))
    
    img.save('assets/powers/fire.png')
    print("✅ Feu créé")

def create_lightning():
    img = Image.new('RGBA', (100, 100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Éclair zigzag
    points = [(50, 10), (45, 30), (52, 35), (47, 50), (54, 55), (48, 70), (55, 75), (50, 90)]
    
    # Ombre
    shadow_points = [(p[0] + 2, p[1] + 2) for p in points]
    draw.line(shadow_points, fill=(100, 100, 255, 100), width=8, joint='curve')
    
    # Éclair principal
    draw.line(points, fill=(200, 200, 255), width=6, joint='curve')
    draw.line(points, fill=(255, 255, 255), width=3, joint='curve')
    
    img.save('assets/powers/lightning.png')
    print("✅ Foudre créée")

def create_ice():
    img = Image.new('RGBA', (100, 100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Cristaux de glace
    crystals = [
        (50, 30, 20),
        (35, 50, 15),
        (65, 50, 15),
        (50, 65, 18),
    ]
    
    for x, y, size in crystals:
        # Cristal
        draw.polygon([
            (x, y - size),
            (x + size//2, y),
            (x, y + size),
            (x - size//2, y)
        ], fill=(180, 220, 255, 200))
        
        # Brillance
        draw.polygon([
            (x, y - size),
            (x + size//4, y - size//2),
            (x, y)
        ], fill=(255, 255, 255, 150))
    
    img.save('assets/powers/ice.png')
    print("✅ Glace créée")

def create_wind():
    img = Image.new('RGBA', (100, 100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Spirale de vent
    for i in range(8):
        angle_offset = i * 45
        radius = 20 + i * 3
        
        # Lignes courbes suggérant le mouvement
        for j in range(3):
            start_x = 50 + (radius + j * 5) * 0.7
            start_y = 50 - (radius + j * 5) * 0.7
            end_x = 50 + (radius + j * 5) * 0.7 * 1.2
            end_y = 50 + (radius + j * 5) * 0.7 * 0.2
            
            draw.line([(start_x, start_y), (end_x, end_y)], 
                     fill=(200, 255, 200, 150 - i * 15), width=3)
    
    img.save('assets/powers/wind.png')
    print("✅ Vent créé")

def create_shadow():
    img = Image.new('RGBA', (100, 100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Aura sombre
    for i in range(5):
        size = 80 - i * 12
        offset = (100 - size) // 2
        alpha = 150 - i * 25
        
        draw.ellipse([offset, offset, offset + size, offset + size], 
                    fill=(50, 0, 80, alpha))
    
    # Éclats sombres
    for i in range(6):
        angle = i * 60
        import math
        x = 50 + int(30 * math.cos(math.radians(angle)))
        y = 50 + int(30 * math.sin(math.radians(angle)))
        draw.ellipse([x-5, y-5, x+5, y+5], fill=(80, 0, 100, 200))
    
    img.save('assets/powers/shadow.png')
    print("✅ Ombre créée")

def create_light():
    img = Image.new('RGBA', (100, 100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Aura lumineuse
    for i in range(6):
        size = 90 - i * 12
        offset = (100 - size) // 2
        alpha = 180 - i * 25
        
        draw.ellipse([offset, offset, offset + size, offset + size], 
                    fill=(255, 255, 200, alpha))
    
    # Rayons
    for i in range(8):
        angle = i * 45
        import math
        x1 = 50 + int(15 * math.cos(math.radians(angle)))
        y1 = 50 + int(15 * math.sin(math.radians(angle)))
        x2 = 50 + int(40 * math.cos(math.radians(angle)))
        y2 = 50 + int(40 * math.sin(math.radians(angle)))
        
        draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255, 220), width=4)
    
    img.save('assets/powers/light.png')
    print("✅ Lumière créée")

# === AURAS ===

def create_hero_aura():
    img = Image.new('RGBA', (200, 200), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Aura multi-couches orange/gold
    for i in range(8):
        size = 190 - i * 20
        offset = (200 - size) // 2
        alpha = 100 - i * 10
        
        if i % 2 == 0:
            color = (255, 140, 0, alpha)
        else:
            color = (255, 215, 0, alpha)
        
        draw.ellipse([offset, offset, offset + size, offset + size], fill=color)
    
    img.save('assets/auras/hero.png')
    print("✅ Aura héros créée")

def create_demon_aura():
    img = Image.new('RGBA', (200, 200), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Aura multi-couches rouge/noir
    for i in range(8):
        size = 190 - i * 20
        offset = (200 - size) // 2
        alpha = 120 - i * 12
        
        if i % 2 == 0:
            color = (220, 20, 60, alpha)
        else:
            color = (139, 0, 0, alpha)
        
        draw.ellipse([offset, offset, offset + size, offset + size], fill=color)
    
    img.save('assets/auras/demon.png')
    print("✅ Aura démon créée")

# Générer tous les assets
print("🎨 Génération des assets...")
print("\n=== ARMES ===")
create_sword()
create_hammer()
create_spear()
create_axe()
create_bow()
create_staff()

print("\n=== POUVOIRS ===")
create_fire()
create_lightning()
create_ice()
create_wind()
create_shadow()
create_light()

print("\n=== AURAS ===")
create_hero_aura()
create_demon_aura()

print("\n✅ Tous les assets sont créés !")
