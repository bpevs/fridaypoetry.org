/* @jsx h */
import { h } from "preact";

export default function Read(props) {
  const { poem } = props;
  if (!poem) return <div>404 not found</div>;

  return (
    <main style="margin: auto; max-width: 500px;">
      {
        /*      <PageTurn
        direction="left"
        onClick={!prevPoemId ? () => {} : this.turn.bind(this, "left")}
        disabled={!prevPoemId}
      />
      <PageTurn
        disabled={!nextPoemId}
        direction="right"
        onClick={!nextPoemId ? () => {} : this.turn.bind(this, "right")}
      />*/
      }
      {
        /*      <div className="left-half" onClick={this.turn.bind(this, "left")} />
      <div className="right-half" onClick={this.turn.bind(this, "right")} />*/
      }
      <h1>{poem.title}</h1>
      <p>
        <strong>By:</strong> {poem.author}
      </p>
      <p style="white-space:pre-wrap;">{poem.text}</p>
    </main>
  );
}
