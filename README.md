# Interactive Word Cloud

A React + D3.js visualization that turns pasted text into an animated word cloud. After stop-word removal, the app plots the five most frequent words, with font size scaled to frequency.

**Live demo:** [https://paridhibhardwajj.github.io/word-cloud](https://paridhibhardwajj.github.io/word-cloud)

## How it works

1. Paste or type text into the input area
2. Click **Generate WordCloud**
3. D3 draws the top 5 remaining words in SVG
4. Updating the text and generating again animates both font size and position

Word size uses D3 `scaleLinear()`. Enter transitions grow font size from 0; updates also tween `x` position so the ranking change is visible.

## Tech stack

React, D3.js, GitHub Pages

## Run locally

```bash
npm install
npm start
```

The app opens at `http://localhost:3000`.

## Design notes

I kept the cloud to the top five words so size differences stay readable and the ranking animation is easy to follow. Stop words are filtered before counting so common function words do not dominate the chart.

Originally built as a data visualization coursework project; this repo is the standalone demo.
