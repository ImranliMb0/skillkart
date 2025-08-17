import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();

export const notifySellerOnOrder = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) => {
    const order = snap.data();

    if (!order) {
      console.error('No order data found in snapshot.');
      return;
    }

    try {
      const sellerDoc = await admin.firestore().collection('users').doc(order.sellerId).get();
      const sellerEmail = sellerDoc.exists ? sellerDoc.data()?.email : 'unknown@example.com';

      const payload = {
        sellerEmail,
        productTitle: order.productTitle,
        quantity: order.quantity,
        buyerName: order.buyerName,
        txnId: order.txnId,
        status: order.status,
        createdAt: order.createdAt,
      };

await fetch("https://mohdimr0099.app.n8n.cloud/webhook/order-notification", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});


      console.log('Webhook sent successfully');
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  });
