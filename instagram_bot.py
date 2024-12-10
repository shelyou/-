from instagrapi import Client
import time
import random
import os

# Fungsi Login
def login_instagram(username, password):
    cl = Client()
    try:
        cl.login(username, password)
        print("Login berhasil!")
        return cl
    except Exception as e:
        print("Login gagal:", e)
        return None

# Fungsi untuk Interaksi Otomatis
def search_and_interact(cl, hashtag, max_actions=10):
    try:
        medias = cl.hashtag_medias_recent(hashtag, amount=max_actions)
        for media in medias:
            # Like postingan
            cl.media_like(media.id)
            print(f"Liked post by: {media.user.username}")
            # Follow pengguna
            cl.user_follow(media.user.pk)
            print(f"Followed: {media.user.username}")
            # Interval waktu acak
            time.sleep(random.randint(30, 60))
    except Exception as e:
        print("Error saat berinteraksi:", e)

# Eksekusi Bot
if __name__ == "__main__":
    IG_USERNAME = os.getenv("mrobotfx")  # Ambil dari Secrets
    IG_PASSWORD = os.getenv("$123456789$")
    
    # Login
    client = login_instagram(IG_USERNAME, IG_PASSWORD)
    
    if client:
        # Interaksi dengan hashtag target
        target_hashtag = "travel", "nature", "photography", "日本旅行", "東京観光", 
            "韓国여행", "케이팝", "fashion", "instatravel", "vacation",
            "beautifuldestinations", "landscapephotography", "streetwear",
            "outfitinspiration", "한국음식", "ラーメン", "寿司"
  ]
        search_and_interact(client, target_hashtag, max_actions=5000)
