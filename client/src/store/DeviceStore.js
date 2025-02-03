import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._brands = []
        this._counts = []
        this._devices = []
        this._selectedBrand = {}
        this._selectedCount = {}
        this._page = 1
        this._totalCount = 5
        this._limit = 1
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }
    setCounts(counts) {
        this._counts = counts
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setSelectedCount(count) {
        this.setPage(1)
        this._selectedCount = count
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get brands() {
        return this._brands
    }
    get counts() {
        return this._counts
    }
    get devices() {
        return this._devices
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedCount() {
        return this._selectedCount
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
