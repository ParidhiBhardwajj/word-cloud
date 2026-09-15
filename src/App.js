import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { wordFrequency: [] };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getWordFrequency = (text) => {
    const stopWords = new Set([
      "the", "and", "a", "an", "in", "on", "at", "for", "with", "about", "as", "by", "to", "of", "from",
      "that", "which", "who", "whom", "this", "these", "those", "it", "its", "they", "their", "them",
      "we", "our", "ours", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "we", "us",
      "theirs", "I", "me", "my", "myself", "yourself", "yourselves", "was", "were", "is", "am", "are",
      "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "if", "each",
      "how", "what", "without", "through", "over", "under", "above", "below", "between", "among",
      "during", "before", "after", "until", "while", "off", "out", "into", "against", "amongst",
      "throughout", "despite", "towards", "upon", "isn't", "aren't", "wasn't", "weren't", "haven't",
      "hasn't", "hadn't", "doesn't", "didn't", "don't", "won't", "wouldn't", "can't", "couldn't",
      "shouldn't", "mustn't", "needn't", "daren't"
    ]);
    const words = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .split(" ")
      .filter((w) => w.length > 0);
    const filteredWords = words.filter((word) => !stopWords.has(word));
    return Object.entries(
      filteredWords.reduce((freq, word) => {
        freq[word] = (freq[word] || 0) + 1;
        return freq;
      }, {})
    );
  };

  renderChart() {
    const data = this.state.wordFrequency
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const width = 1000;
    const height = 300;
    const padding = 80;

    const svg = d3.select(".svg_parent").attr("width", width).attr("height", height);

    const g = svg.selectAll("g").data([0]).join("g");

    if (data.length === 0) {
      g.selectAll("text").remove();
      return;
    }

    const minFreq = Math.min(...data.map((d) => d[1]));
    const maxFreq = Math.max(...data.map((d) => d[1]));

    const fontScale = d3
      .scaleLinear()
      .domain([minFreq, maxFreq])
      .range([28, 72]);

    const xScale = d3
      .scaleLinear()
      .domain([0, Math.max(data.length - 1, 0)])
      .range([padding, width - padding]);

    const yCenter = height / 2;

    const text = g.selectAll("text").data(data, (d) => d[0]);

    text
      .enter()
      .append("text")
      .attr("x", (d, i) => xScale(i))
      .attr("y", yCenter)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", 0)
      .text((d) => d[0])
      .transition()
      .duration(750)
      .attr("font-size", (d) => fontScale(d[1]));

    text
      .transition()
      .duration(750)
      .attr("x", (d, i) => xScale(i))
      .attr("y", yCenter)
      .attr("font-size", (d) => fontScale(d[1]));

    text.exit().remove();
  }

  render() {
    return (
      <div className="parent">
        <div className="child1" style={{ width: 1000 }}>
          <textarea
            type="text"
            id="input_field"
            style={{ height: 150, width: 1000 }}
          />
          <button
            type="submit"
            value="Generate Matrix"
            style={{ marginTop: 10, height: 40, width: 1000 }}
            onClick={() => {
              const input_data = document.getElementById("input_field").value;
              this.setState({
                wordFrequency: this.getWordFrequency(input_data),
              });
            }}
          >
            Generate WordCloud
          </button>
        </div>
        <div className="child2">
          <svg className="svg_parent"></svg>
        </div>
      </div>
    );
  }
}

export default App;
