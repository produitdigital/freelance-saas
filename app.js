import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   GET USER PLAN
========================= */
export async function getUserPlan(){

  const uid = auth.currentUser.uid;

  const snap = await getDoc(doc(db, "users", uid));

  if(snap.exists()){
    return snap.data().plan || "free";
  }

  return "free";
}

/* =========================
   ADD TRANSACTION
========================= */
export async function addTransaction(type, amount){

  const uid = auth.currentUser.uid;

  await addDoc(collection(db, "users", uid, "transactions"), {
    type: type,
    amount: Number(amount),
    createdAt: new Date()
  });

}

/* =========================
   GET TOTALS (FOR DASHBOARD)
========================= */
export async function getTotals(){

  const uid = auth.currentUser.uid;

  const snap = await getDocs(collection(db, "users", uid, "transactions"));

  let income = 0;
  let expense = 0;

  snap.forEach(doc => {
    const d = doc.data();

    if(d.type === "income") income += d.amount;
    if(d.type === "expense") expense += d.amount;
  });

  return {
    income,
    expense,
    profit: income - expense
  };
}
