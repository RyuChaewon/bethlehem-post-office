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

// [추가] 이전/다음 메시지 ID 찾기
// direction: 'prev' (최신글 방향) 또는 'next' (과거글 방향)
export const getAdjacentMessageId = async (theme, currentCreatedAt, direction) => {
  try {
    let q;
    const colRef = collection(db, COLLECTION_NAME);

    if (direction === 'prev') {
      // 이전 글 (더 최신 글 찾기): 현재 시간보다 크고, 오름차순 정렬 중 첫 번째
      q = query(
        colRef,
        where("theme", "==", theme),
        where("createdAt", ">", currentCreatedAt),
        orderBy("createdAt", "asc"), // 시간순으로 가장 가까운 미래
        limit(1)
      );
    } else {
      // 다음 글 (더 옛날 글 찾기): 현재 시간보다 작고, 내림차순 정렬 중 첫 번째
      q = query(
        colRef,
        where("theme", "==", theme),
        where("createdAt", "<", currentCreatedAt),
        orderBy("createdAt", "desc"), // 시간순으로 가장 가까운 과거
        limit(1)
      );
    }

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].id; // 찾은 메시지 ID 반환
    }
    return null; // 없으면 null
  } catch (error) {
    console.error("Error finding adjacent message:", error);
    return null;
  }
};