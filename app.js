import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   GLOBAL STATE
========================= */
let income = 0;
let expense = 0;

/* =========================
   ADD TRANSACTION
========================= */
window.addTransaction = async () => {

  if (!auth.currentUser) {
    alert("Please login first");
    return;
  }

  const uid = auth.currentUser.uid;

  const type = document.getElementById("type").value;
  const amount = Number(document.getElementById("amount").value);

  await addDoc(collection(db, "users", uid, "transactions"), {
    type,
    amount,
    createdAt: new Date()
  });

  loadData();
};

/* =========================
   LOAD DASHBOARD DATA
========================= */
async function loadData() {

  if (!auth.currentUser) return;

  const uid = auth.currentUser.uid;

  const snap = await getDocs(
    collection(db, "users", uid, "transactions")
  );

  income = 0;
  expense = 0;

  snap.forEach(doc => {
    const d = doc.data();

    if (d.type === "income") income += d.amount;
    if (d.type === "expense") expense += d.amount;
  });

  document.getElementById("income").innerText = income;
  document.getElementById("expense").innerText = expense;
  document.getElementById("profit").innerText = income - expense;
}

/* =========================
   INIT
========================= */
loadData();
