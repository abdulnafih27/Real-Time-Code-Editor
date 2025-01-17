import React, { useEffect, useRef } from "react";
import "./editor.css";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

const Editor = ({socketRef, roomId, onCodeChange}) => {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
          document.getElementById("realTimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current = editor

      editor.setSize(null, "100%"); // Adjust width and height as needed

      editorRef.current.on('change', (instance, change) => {
        // console.log(change, instance)
        const {origin} = change
        const code = instance.getValue()
        onCodeChange(code)
        if( origin !== 'setValue'){
          socketRef.current.emit('code-change', {
            roomId,
            code
          })
        }
      })

    };
    init();
  }, []);

  useEffect(()=>{
    if(socketRef.current){

      socketRef.current.on("code-change", ({ code }) => {
        if (code != null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off('code-change')
    }
  },[socketRef.current])

  return (
    <div style={{ height: "100%", overflow: "hidden", textAlign: "left" }}>
      <textarea id="realTimeEditor" />
    </div>
  );
};

export default Editor;
