from transformers import pipeline
from googletrans import Translator
import torch
import time
from flask import Flask, render_template, request

app = Flask(__name__, template_folder="templates")

model = 'pszemraj/long-t5-tglobal-base-16384-book-summary'

summarizer = pipeline(
    "summarization",
    model,
    device=0 if torch.cuda.is_available() else -1,
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
    ARTICLE = data['text']

    result = summarizer(ARTICLE, max_length=len(ARTICLE.split(" ")))
    result = result[0]["summary_text"]
    result = translate_text(result)

    bahasa = translate_text(result)

    end_time = time.time()
    elapsed_time = f"Membutuhkan waktu sekitar {round(end_time - start_time)} detik untuk process"

    response = {"result": bahasa, "time": elapsed_time}

    return response


if __name__ == '__main__':
    app.run(debug=True)
