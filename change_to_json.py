import pandas as pd
# import numpy
import json


def convert_to_json(path, save_path):
    df = pd.read_csv(path)
    df.to_json(save_path)


path = r'./RSVP_list.json'
save_path = r'./RSVP_list_correct.json'
with open(path) as file:
    data = json.load(file)

new_data = {}
# guest_id, guest_name, invited_pax
for k,v in data['guest_id'].items():
    new_data[v] = {'guest_name':data['guest_name'][k], 
                     'num_pax': data['invited_pax'][k]}


with open(save_path, 'w') as f:
    json.dump(new_data, f, indent=4)