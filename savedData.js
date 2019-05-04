class savedData {
    constructor() {
        if (localStorage.savedData !== undefined) {
            return savedData.getData();
        } else {
            this.inventory = ["", "", ""];
            this.stats = {
                sadness: 0,
                badness: 0
            };
        }
    }

    static getData() {
        return JSON.parse(localStorage.savedData);
    }

    static setData(obj) {
        localStorage.savedData = JSON.stringify(obj);
    }
}