import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface DataItem {
  id?: string;
  title: string;
  description: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'dataItems';

class DataService {
  // Add new data item
  async addItem(item: Omit<DataItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...item,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding item:', error);
      throw new Error('Failed to add item');
    }
  }

  // Get all data items
  async getAllItems(): Promise<DataItem[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as DataItem));
    } catch (error) {
      console.error('Error getting items:', error);
      throw new Error('Failed to fetch items');
    }
  }

  // Update data item
  async updateItem(id: string, updates: Partial<Omit<DataItem, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const itemRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(itemRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating item:', error);
      throw new Error('Failed to update item');
    }
  }

  // Delete data item
  async deleteItem(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new Error('Failed to delete item');
    }
  }

  // Subscribe to real-time updates
  subscribeToItems(callback: (items: DataItem[]) => void): () => void {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as DataItem));
      callback(items);
    }, (error) => {
      console.error('Error in subscription:', error);
    });
  }
}

export const dataService = new DataService();