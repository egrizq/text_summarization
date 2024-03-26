from transformers import pipeline
from googletrans import Translator
import torch
import time
from flask import Flask, render_template, request

app = Flask(__name__, template_folder="templates")

summarizer = pipeline(
    "summarization",
    "pszemraj/long-t5-tglobal-base-16384-book-summary",
)


def translate_text(text):
    translator = Translator()
    return translator.translate(text, dest="id").text


@app.route("/")
def hello():
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process():
    start_time = time.time()

    data = request.get_json()
    REQUEST_TEXT = data['text']

    english = summarizer(REQUEST_TEXT, max_length=len(REQUEST_TEXT.split(" ")))
    english = english[0]["summary_text"]

    # this continue, since googletrans need token
    bahasa = translate_text(english)

    end_time = time.time()
    elapsed_time = f"Membutuhkan waktu sekitar {round(end_time - start_time)} detik untuk process"

    response = {"text": english, "time": elapsed_time}
    print(response)

    return response


if __name__ == '__main__':
    app.run(debug=True)
