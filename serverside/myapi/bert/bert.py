import pandas as pd

import torch
from torch.utils.data import DataLoader, Dataset
from transformers import BertTokenizer, BertForTokenClassification, AdamW
from transformers import get_linear_schedule_with_warmup
from torch.nn.utils.rnn import pad_sequence



model_folder_path = 'serverside/myapi/bert/pytorch_model.bin'

tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertForTokenClassification.from_pretrained(model_folder_path)


def filter_symptoms(custom_text):
    tokens = tokenizer.tokenize(custom_text)

    # Convert tokens to input features
    input_ids = tokenizer.convert_tokens_to_ids(tokens)
    attention_mask = [1] * len(input_ids)

    # Convert input features to tensors
    input_ids = torch.tensor([input_ids])
    attention_mask = torch.tensor([attention_mask])

    # Perform inference
    with torch.no_grad():
        model.eval()
        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        _, predicted = torch.max(logits, 2)

    # Convert the predicted label IDs back to the original label names
    label_map_reverse = {0: "O", 1: "B-SYMPTOM", 2: "I-SYMPTOM", 3: "B-NEG-SYMPTOM", 4: "I-NEG-SYMPTOM"}
    predicted_labels = [label_map_reverse[p.item()] for p in predicted[0]]

    # Display the tokens and their corresponding labels
    symptoms = []
    word = ""
    for token, label in zip(tokens, predicted_labels):
        if label == "B-SYMPTOM" or label == "B-NEG-SYMPTOM":
            word = token
        elif label == "I-SYMPTOM" or label == "I-NEG-SYMPTOM":
            word+= token
        else:
            if word:
                symptoms.append(word)

    return symptoms
