class Vehicle {
  #brand;
  #model;
  #year;
  #mileage;
  constructor(brand, model, year, mileage) {
    this.#brand = brand;
    this.#model = model;
    this.#year = year;
    this.#mileage = mileage;
  }
  get brand() {
    return this.#brand;
  }
  get model() {
    return this.#model;
  }
  get year() {
    return this.#year;
  }
  get mileage() {
    return this.#mileage;
  }
  getInfo() {
    return `${this.#brand} ${this.#model} (${this.#year}), пробег: ${this.#mileage} км`;
  }
}

class Car extends Vehicle {
  #bodyType;
  constructor(brand, model, year, mileage, bodyType) {
    super(brand, model, year, mileage);
    this.#bodyType = bodyType;
  }
  get bodyType() {
    return this.#bodyType;
  }
  getInfo() {
    return `${super.getInfo()}, тип кузова: ${this.#bodyType}`;
  }
}

class Truck extends Vehicle {
  #loadCapacity;
  constructor(brand, model, year, mileage, loadCapacity) {
    super(brand, model, year, mileage);
    this.#loadCapacity = loadCapacity;
  }
  get loadCapacity() {
    return this.#loadCapacity;
  }
  getInfo() {
    return `${super.getInfo()}, грузоподъёмность: ${this.#loadCapacity} тонн`;
  }
}

class Motorcycle extends Vehicle {
  #engineVolume;
  constructor(brand, model, year, mileage, engineVolume) {
    super(brand, model, year, mileage);
    this.#engineVolume = engineVolume;
  }
  get engineVolume() {
    return this.#engineVolume;
  }
  getInfo() {
    return `${super.getInfo()}, объём двигателя: ${this.#engineVolume} куб.см`;
  }
}

class Fleet {
  #vehicles = [];
  addVehicle(vehicle) {
    if (vehicle instanceof Vehicle) {
      this.#vehicles.push(vehicle);
    } else {
      throw new Error("Можно добавлять только объекты транспортных средств");
    }
  }
  listVehicles() {
    console.log("Список всех транспортных средств:");
    this.#vehicles.forEach((vehicle, index) => {
      console.log(`${index + 1}. ${vehicle.getInfo()}`);
    });
  }
  findByBrand(brand) {
    return this.#vehicles.filter(vehicle => 
      vehicle.brand.toLowerCase() === brand.toLowerCase()
    );
  }
  findByModel(model) {
    return this.#vehicles.filter(vehicle => 
      vehicle.model.toLowerCase() === model.toLowerCase()
    );
  }
}

// Пример использования
const fleet = new Fleet();

// Добавляем транспорт
const car = new Car("Toyota", "Corolla", 2020, 0, "Sedan");
const truck = new Truck("Volvo", "FH16", 2018, 0 , 25);
const motorcycle = new Motorcycle("Kawasaki", "NINJA 650", 2025, 0, 649);

fleet.addVehicle(car);
fleet.addVehicle(truck);
fleet.addVehicle(motorcycle);
// Список всех транспортных средств
fleet.listVehicles();
// Поиск по марке
console.log("\nПоиск по марке 'Toyota':");
const toyotaVehicles = fleet.findByBrand("Toyota");
toyotaVehicles.forEach(vehicle => console.log(vehicle.getInfo()));
// Поиск по модели
console.log("\nПоиск по модели 'FH16':");
const fh16Vehicles = fleet.findByModel("FH16");
fh16Vehicles.forEach(vehicle => console.log(vehicle.getInfo()));