import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  limit,
  startAfter,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment 
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = "messages";

// 1. 메시지 저장
export const saveMessage = async (messageData) => {
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

// 2. 메시지 불러오기 (페이지네이션 적용)
export const getMessages = async (theme, lastDoc = null) => {
  try {
    let q;
    if (!lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        where("theme", "==", theme),
        orderBy("createdAt", "desc"),
        limit(20)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        where("theme", "==", theme),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(20)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { data, lastVisible };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return { data: [], lastVisible: null };
  }
};

// 3. 메시지 단건 조회
export const getMessageById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

// 4. 방문자 수 카운트 (선택 사항)
export const handleVisitorCount = async () => {
  const docRef = doc(db, "stats", "visitor_count");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, { count: increment(1) });
      return docSnap.data().count + 1;
    } else {
      await setDoc(docRef, { count: 1 });
      return 1;
    }
  } catch (error) {
    // [수정됨] error 변수를 사용하도록 console.error 추가
    console.error("Error handling visitor count:", error); 
    return 0;
  }
};

export const getVisitorCountOnly = async () => {
  try {
    const docRef = doc(db, "stats", "visitor_count");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().count : 0;
  } catch (error) {
    // [수정됨] error 변수를 사용하도록 console.error 추가
    console.error("Error getting visitor count:", error);
    return 0;
  }
};