const mysql = require('mysql2/promise');

async function main() {
    // Подключение к базе данных
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // замените на вашего пользователя
        password: '5555', // замените на ваш пароль
        database: 'auto_fleet'
    });

    try {
        // Задание 1: Создание таблицы и добавление данных
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS vehicles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                license_plate VARCHAR(15) UNIQUE NOT NULL,
                make VARCHAR(50) NOT NULL,
                model VARCHAR(50) NOT NULL,
                year INT NOT NULL,
                mileage INT NOT NULL,
                is_available BOOLEAN DEFAULT TRUE
            )
        `);

        // Добавление тестовых данных
        await connection.execute(`
            INSERT INTO vehicles (license_plate, make, model, year, mileage, is_available)
            VALUES 
                ('А123БВ777', 'Toyota', 'Camry', 2018, 45000, TRUE),
                ('В456ТК777', 'Honda', 'Accord', 2019, 38000, TRUE),
                ('Е789КХ777', 'Ford', 'Focus', 2015, 62000, FALSE),
                ('О321ТТ777', 'Lada', 'Granta', 2009, 120000, TRUE)
            ON DUPLICATE KEY UPDATE license_plate = license_plate
        `);

        console.log('Таблица vehicles создана и заполнена тестовыми данными');

        // Задание 2: Выборка данных (SELECT)

        // Все доступные авто
        const [availableVehicles] = await connection.execute(
            'SELECT * FROM vehicles WHERE is_available = TRUE'
        );
        console.log('\nДоступные автомобили:');
        console.table(availableVehicles);

        // Авто определенной марки (Toyota)
        const [toyotaVehicles] = await connection.execute(
            'SELECT * FROM vehicles WHERE make = ?', ['Toyota']
        );
        console.log('\nАвтомобили марки Toyota:');
        console.table(toyotaVehicles);

        // Авто с пробегом больше 50 000 км
        const [highMileageVehicles] = await connection.execute(
            'SELECT * FROM vehicles WHERE mileage > ?', [50000]
        );
        console.log('\nАвтомобили с пробегом больше 50 000 км:');
        console.table(highMileageVehicles);

        // Задание 3: Обновление данных (UPDATE)
        // Обновим пробег у Ford Focus
        await connection.execute(
            'UPDATE vehicles SET mileage = ? WHERE license_plate = ?',
            [65000, 'Е789КХ777']
        );
        console.log('\nПробег Ford Focus обновлен до 65000 км');

        // Задание 4: Удаление данных (DELETE)
        // Удалим автомобили до 2010 года
        const [deleteResult] = await connection.execute(
            'DELETE FROM vehicles WHERE year < ?', [2010]
        );
        console.log(`\nУдалено ${deleteResult.affectedRows} автомобилей до 2010 года`);

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        await connection.end();
    }
}

main();