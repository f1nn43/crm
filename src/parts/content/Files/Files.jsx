import React, { useEffect, useState } from 'react';
import styles from './Files.module.css'

const CLIENT_ID = "647821350783-3dm4fv4ne1is2194fl9s0kmtst4b7pv2.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const API_KEY = "AIzaSyDxFbY9dfNKzuZ6050LEWQWwpAnDVEBUqE"

const Files = () => {
    const [link, setLink] = useState(null)
    const [documents, setDocuments] = useState([]);
    function linkChange(ev) {
        setLink(ev.target.value);
    }

  return (
    <div className={styles.files}>
      <h1>Google Docs Editor</h1>
      <input type="text" value={link} onChange={(e) => linkChange(e)}/>
      {link ? (<iframe
      src={"https://docs.google.com/document/d/"+ link + "/edit?embedded=true"}
      width="100%"
      height="600"
      frameBorder="0"
      scrolling="auto"
    ></iframe>) :
    (<div>
        Выведите линк
        {documents.map((document) => (
          <div key={document.documentId}>{document.title}</div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Files;