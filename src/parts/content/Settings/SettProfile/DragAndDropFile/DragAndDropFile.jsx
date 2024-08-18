import firebase from 'firebase/compat/app';
import './DragAndDropFile.css'
import parse from 'url-parse'
import { Button } from 'primereact/button';
import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { toast } from 'react-toastify';

const DragAndDropFile = (props) => {
    
    const storage = firebase.storage;

    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [visible, setVisible] = useState(false);
  
    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    };
  
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
  
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
        uploadFile(droppedFile)
      }
    };

    const deleteFile = async (filePath) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(filePath);
      
        try {
          await fileRef.delete();
        } catch (error) {
          console.error('Error deleting file:', error);
        }
    };
  
  const accept = () => {
    const database = firebase.database();
    const ref = database.ref('/users');
    const updatedUsers = props.users
    
    updatedUsers.forEach(us => {
      if (us.uid === props.user.uid) {
        if (us.avatar) {
          deleteFile(extractPathFromFirebaseURL(us.avatar))
        }
        us.avatar = null
      }
    });
    ref.set(updatedUsers)
    toast.success('Ваша аватарка успешно удалена')
  }

  const reject = () => {
    toast.error('Удаление аватарки отменено')
  }

    const extractPathFromFirebaseURL = (url) => {
        try {
          const parsedURL = parse(url, true);
          const pathArray = parsedURL.pathname.split('/');
      
          const pathIndex = pathArray.indexOf(props.user.name);
          const filePath = decodeURIComponent(pathArray.slice(pathIndex).join('/').replace('/alt=media&token=', '').replace('%2F', '/'));
      
          return filePath;
        } catch (error) {
          console.error('Error extracting path from URL:', error);
          return null;
        }
      };

    const uploadFile = async (file) => {
        const database = firebase.database();
        const ref = database.ref('/users');
      setUploading(true);
  
      const storageRef = storage().ref();
      const fileRef = storageRef.child(`${props.user.name}/${file.name}`);
      
      try {
        await fileRef.put(file);
        const downloadURL = await fileRef.getDownloadURL();
        const updatedUsers = props.users
        updatedUsers.forEach(us => {
            if(us.uid === props.user.uid){
                us.avatar = downloadURL
            }
        });
        ref.set(updatedUsers)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  
      setUploading(false);
    };
    
    if(props.user.avatar){
      return(
        <div className="dragAndDropFile">
          <div className={`drop-containerAva`}>
            <img src={props.user.avatar} alt='avatar' />
          </div>
          <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Вы точно хотите удалить аватарку?"
            header="Подтверждение удаления" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
          <Button onClick={() => setVisible(true)} label="Delete" severity="danger" raised />
        </div>
      )
    } else {
      return (
        <div
          className={`drop-container ${dragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Перетащите файл сюда</p>
          {uploading && <p>Загрузка...</p>}
        </div>
      );
    }
    
  };

export default DragAndDropFile