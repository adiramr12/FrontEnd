class CaloriesIdb {
  constructor() {
    this.dbs = new Map();
  }

  async openCaloriesDB(dbName, version) {
    try {
      const db = await new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, version);
        request.onerror = event => {
          reject(`Failed to open DB: ${event.target.errorCode}`);
        };

        request.onsuccess = event => {
          resolve(event.target.result);
        };

        request.onupgradeneeded = event => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(dbName)) {
            const store = db.createObjectStore(dbName, { keyPath: 'id', autoIncrement: true });
            store.createIndex('month_and_year', ['year', 'month'], { unique: false });
          }
        };
      });
      const dbController = new CaloriesController(db, dbName);
      this.dbs.set(dbName, dbController);
      console.log(`openCaloriesDB(): success, db "${dbName}" created.`);
      return dbController;
    } catch (error) {
      console.error(`openCaloriesDB(): error: ${error}`);
      throw error;
    }
  }

  getDB(dbName) {
    if (!this.dbs.has(dbName)) {
      throw new Error(`Database "${dbName}" not opened`);
    }
    return this.dbs.get(dbName);
  }
}

class CaloriesController {
  constructor(db, dbName) {
    this.db = db;
    this.dbName = dbName;
  }

  clearAllCalories = () => {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.dbName, 'readwrite');
      const store = transaction.objectStore(this.dbName);
      const request = store.clear();
      request.onsuccess = event => {
        resolve(event.target.result);
      };
      request.onerror = event => {
        reject(`Failed to clear calories: ${event.target.errorCode}`);
      };
    });
  };

  getAllCalories = () => {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.dbName, 'readonly');
      const store = transaction.objectStore(this.dbName);
      const request = store.getAll();
      request.onsuccess = event => {
        resolve(event.target.result);
      };
      request.onerror = event => {
        reject(`Failed to get calories: ${event.target.errorCode}`);
      };
    });
  };

  getCaloriesByDate = (year, month) => {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.dbName, 'readonly');
      const store = transaction.objectStore(this.dbName);
      const index = store.index('month_and_year');

      const range = IDBKeyRange.only([year, month]);
      const request = index.getAll(range);

      request.onsuccess = event => {
        resolve(event.target.result);
      };
      request.onerror = event => {
        reject(`Failed to filter calories by date: ${event.target.errorCode}`);
      };
    });
  };

  addCalories = calories => {
    return new Promise((resolve, reject) => {
      calories.year = calories.year || new Date().getFullYear();
      calories.month = calories.month || new Date().getMonth() + 1;
      const transaction = this.db.transaction(this.dbName, 'readwrite');
      const store = transaction.objectStore(this.dbName);
      const request = store.add(calories);
      request.onsuccess = event => {
        resolve(event.target.result);
      };
      request.onerror = event => {
        reject(`Failed to add calories: ${event.target.errorCode}`);
      };
    });
  };
}

window.idb = new CaloriesIdb();
