import random
def get_settings(level):
    if level == "1":
        return 1, 10, 5
    if level == "2":
        return 1, 50, 7
    if level == "3" :
        return 1, 100, 10
    return None
def hitung_skor(percobaan, maksimal_percobaan):
    skor=round(100*(maksimal_percobaan-(percobaan-1))/maksimal_percobaan)
    if skor < 0 :
        skor=0
    return skor
def main_game():
    print("/n=== GUESS THE NUMBER ===")
    print("Pick Your Level")
    print("1. Easy (1-10, 5 kesempatan)")
    print("2. Medium (1-50, 7 kesempatan)")
    print("3. Hard (1-100, 10 kesempatan)")
    level=input("Pilih (1/2/3):").strip()
    settings=get_settings(level)
    if not settings:
        print("Pilihan tidak valid.")
        return
    
    low, high, maksimal_percobaan=settings
    angka_rahasia=random.randint(low, high)
    percobaan=0
    menang=False
    print(f"nTebak angka {low} sampai {high}. Kesempatan: {maksimal_percobaan}")

    while percobaan<maksimal_percobaan:
        try:
            tebakan=int(input("Tebakan kamu:"))
        except ValueError:
            print("⚠️ Masukkan angka ya (bukan huruf).")
            continue
        percobaan += 1
        if tebakan == angka_rahasia:
            menang=True
            break
        selisih=abs(tebakan-angka_rahasia)
        if tebakan < angka_rahasia:
            print("Terlalu kecil!")
        else:
            print("Terlalu besar!")
        
        if selisih <= 3:
            print("Udah dekat banget!🔥")
        elif selisih <=10:
            print("Lumayan dekat!✨")
        else:
            print("Masih jauh!❄️")
        print("Sisa kesempatan:", maksimal_percobaan-percobaan)
    
    if menang:
        skor=hitung_skor(percobaan, maksimal_percobaan)
        print("/n🎉 Benar! Kamu menang!")
        print("Jumlah percobaan:", percobaan)
        print("🏆 Skor kamu:", skor)
    else:
        print("/n💀 Kamu kalah!")
        print("Angka yang benar adalah:", angka_rahasia)
        print("🏆 Skor kamu:0")

def menu():
    while True:
        print("/n=== MENU ===")
        print("1. Main")
        print("2. Keluar")
        pilih = input("Pilih:").strip()

        if pilih == "1":
            main_game()
        elif pilih == "2":
            print("Bye!👋")
            break
        else:
            print("Pilihan tidak valid.")
menu()
