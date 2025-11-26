// src/firebase/messageService.js
import { db } from './config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc,     // 👈 추가
  getDoc   // 👈 추가
} from 'firebase/firestore';

const COLLECTION_NAME = "messages";

// 1. 메시지 저장 (작성)
export const saveMessage = async (messageData) => {
  // messageData: { nickname, content, ornament, theme('sky'/'stable'), timestamp }
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...messageData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// 2. 메시지 불러오기 (테마별: 밤하늘/마구간)
export const getMessages = async (theme) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("theme", "==", theme),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

// 3. ⭐️ ID로 메시지 하나만 가져오기
export const getMessageById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id); // 특정 ID의 문서 지목
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};