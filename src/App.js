import React, { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import UpdateContent from "./components/UpdateContent";
import CreateContent from "./components/CreateContent";

import webImg from "./img/web.png";
import htmlImg from "./img/html.png";
import cssImg from "./img/css.png";
import jsImg from "./img/javascript.png";
import reactImg from "./img/react.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 4;
    this.state = {
      mode: "welcome",
      selected_content_id: 0,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!", image: webImg },
      contents: [
        {
          id: 1,
          title: "HTML",
          desc: "HTML is for information",
          image: htmlImg,
        },
        { id: 2, title: "CSS", desc: "CSS is for design", image: cssImg },
        {
          id: 3,
          title: "JavaScript",
          desc: "JS is for interactive",
          image: jsImg,
        },
        { id: 4, title: "React", desc: "React is for UI", image: reactImg },
      ],
    };
  }

  getReadContent() {
    return this.state.contents.find(
      (content) => content.id === this.state.selected_content_id
    );
  }

  getContent() {
    const { mode } = this.state;

    if (mode === "welcome") {
      const { title, desc, image } = this.state.welcome;
      return <ReadContent title={title} desc={desc} img={image} />;
    }

    if (mode === "read") {
      const { title, desc, image } = this.getReadContent();
      return <ReadContent title={title} desc={desc} img={image} />;
    }

    if (mode === "create") {
      return (
        <CreateContent
          onSubmit={(_title, _desc) => {
            this.setState((prevState) => {
              const newId = prevState.max_content_id + 1;
              const newContent = {
                id: newId,
                title: _title,
                desc: _desc,
                image: "",
              };
              return {
                contents: [...prevState.contents, newContent],
                max_content_id: newId,
                mode: "read",
              };
            });
          }}
        />
      );
    }

    if (mode === "update") {
      const { title, desc } = this.getReadContent();
      return (
        <UpdateContent
          data={{ title, desc }}
          onSubmit={(_title, _desc) => {
            this.setState((prevState) => {
              const updatedContents = prevState.contents.map((content) =>
                content.id === prevState.selected_content_id
                  ? { ...content, title: _title, desc: _desc }
                  : content
              );
              return { contents: updatedContents, mode: "read" };
            });
          }}
        />
      );
    }

    return null;
  }

  render() {
    const { mode, subject, contents } = this.state;

    return (
      <div className="App">
        <Subject
          title={subject.title}
          sub={subject.sub}
          onChangePage={() => {
            this.setState({ mode: "welcome" });
          }}
        />
        <TOC
          onChangePage={(id) => {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }}
          data={contents}
        />
        {this.getContent()}
        <Control
          onChangeMode={(newMode) => {
            if (newMode === "delete") {
              if (window.confirm("really?")) {
                this.setState((prevState) => {
                  const updatedContents = prevState.contents.filter(
                    (content) => content.id !== prevState.selected_content_id
                  );
                  return {
                    mode: "welcome",
                    contents: updatedContents,
                  };
                });
                alert("deleted!");
              }
            } else {
              this.setState({ mode: newMode });
            }
          }}
        />
      </div>
    );
  }
}

export default App;
