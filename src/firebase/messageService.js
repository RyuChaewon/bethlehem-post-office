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

// 메시지를 Firestore에 저장하고 생성된 문서 ID를 반환합니다.
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

// 테마별 메시지를 최신순으로 페이지네이션해 불러옵니다.
export const getMessages = async (theme, lastDoc = null) => {
  try {
    let q;
    const MSG_LIMIT = 10;
    if (!lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        where("theme", "==", theme),
        orderBy("createdAt", "desc"),
        limit(MSG_LIMIT)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        where("theme", "==", theme),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(MSG_LIMIT)
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

// ID로 메시지 한 건을 조회합니다.
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

// 방문자 수를 1 증가시키고 최신 카운트를 반환합니다.
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
    console.error("Error handling visitor count:", error); 
    return 0;
  }
};

// 방문자 수를 증가시키지 않고 현재 값만 조회합니다.
export const getVisitorCountOnly = async () => {
  try {
    const docRef = doc(db, "stats", "visitor_count");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().count : 0;
  } catch (error) {
    console.error("Error getting visitor count:", error);
    return 0;
  }
};

// 상세 화면에서 현재 메시지 기준 이전/다음 메시지 ID를 찾습니다.
export const getAdjacentMessageId = async (theme, currentCreatedAt, direction) => {
  try {
    let q;
    const colRef = collection(db, COLLECTION_NAME);

    if (direction === 'prev') {
      // 현재 메시지보다 최신인 메시지 중 가장 가까운 항목을 찾습니다.
      q = query(
        colRef,
        where("theme", "==", theme),
        where("createdAt", ">", currentCreatedAt),
        orderBy("createdAt", "asc"),
        limit(1)
      );
    } else {
      // 현재 메시지보다 오래된 메시지 중 가장 가까운 항목을 찾습니다.
      q = query(
        colRef,
        where("theme", "==", theme),
        where("createdAt", "<", currentCreatedAt),
        orderBy("createdAt", "desc"),
        limit(1)
      );
    }

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error finding adjacent message:", error);
    return null;
  }
};