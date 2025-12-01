import pandas as pd
# import numpy
import json


def convert_to_json(path, save_path):
    df = pd.read_csv(path)
    df.to_json(save_path)

def change_json_structure(path, save_path):
    with open(path) as file:
        data = json.load(file)

    new_data = {}
    # guest_id, guest_name, invited_pax
    for k,v in data['guest_id'].items():
        new_data[v] = {'guest_name':data['guest_name'][k], 
                        'num_pax': data['invited_pax'][k]}
        
        
    with open(save_path, 'w') as f:
        json.dump(new_data, f, indent=4)

# functions to generate link, chat, etc.

class wedding_invitation_generator():
    def __init__(self, path, save_path, link_address:str, chat_template:str, chat_template_indo:str,slice:int):

        self.df = pd.read_csv(path)
        self.link_address = link_address
        self.save_path = save_path
        self.chat_template = chat_template
        self.chat_template_indo = chat_template_indo
        self.slice=slice

    def generate_links(self, df, link_address):
        guest_ids = df['guest_id'].tolist()

        guest_links = []
        for id in guest_ids:
            new_link = link_address + f'?guest={id}'
            guest_links.append(new_link)
        
        df['guest_links'] = guest_links
        return df
    

    def generate_chat(self, df, chat_template, chat_template_indo,slice):
        
        guest_name = df['guest_name']
        guest_links = df['guest_links']

        guest_invitations = [chat_template.format(guest_name[i], guest_links[i]) if i > slice else chat_template_indo.format(guest_name[i], guest_links[i]) for i in range(len(guest_name))]
        df['guest_chat'] = guest_invitations
        return df

    def run(self, add_links=True, add_chat=True):
        
        if add_links == True and add_chat == True:
            df =  self.generate_links(df=self.df, link_address=self.link_address)
            df = self.generate_chat(df=df, chat_template=self.chat_template, chat_template_indo=self.chat_template_indo, slice=self.slice)
        
        if self.save_path is not None:
            df.to_csv(self.save_path)
        
        return df

        


if __name__== '__main__':
    
    link_address = 'https://christoferjulio3.github.io/wedding-invitation/index.html'
    path = './RSVP_list.csv'
    save_path = './RSVP_list_with_chat_template.csv'
    slice = 84

    chat_template = '''Dear {} 😊,
We are excited to share that we’re getting married! 💍
We would be honored to have you celebrate with us.


Please let us know if you can attend by filling the RSVP form in the website. 
{}
Thank you, and see you soon! 😊
'''
    
    chat_template_indo = '''kepada bapak/ibu {},

dengan penuh sukacita, kami ingin mengundang bapak/ibu untuk hadir dalam acara pernikahan kami:
Nama mempelai pria: Christofer Julio
anak dari: Juliantoro Gunawan dan Effi Susi

Nama mempelai Wanita: Yovita Permata Budi
anak dari: Budi Suprapto dan Vinis Pudjiastuti

yang akan dilaksanakan pada:
Tanggal: 28 Desember 2025.
lokasi pemberkatan: Gereja Katolik Santo Paulus Pringgolayan
waktu pemberkatan: pukul 10.00

lokasi resepsi: Ayala Hall, Pasific Restaurant
waktu resepsi: pukul 18.00

Dimohon bapak/ibu untuk mengisi kehadiran resepsi melalui website dibawah ini:
{}

    
Kehadiran anda akan sangat berarti bagi kami, terima kasih atas perhatiannya :)
'''



generate = wedding_invitation_generator(path, save_path, link_address, chat_template, chat_template_indo,slice)
generate.run()
