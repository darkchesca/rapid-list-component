// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

/**
 * @name makeData
 * @description generates an array of objects
 * @param {number} rowNumber array length
 * @param {boolean} isConsistent gives all objects in array same attributes
 * */
export const makeData = (rowNumber = 10, isConsistent = true) => {
    let data = [];
    if (rowNumber <= 0) {
        return data;
    }
    for (let i = 0; i < rowNumber; i++) {
        let row = {
        };
        const name = faker.animal.snake();
        const description = faker.animal.type();
        const phone = faker.phone.number('+48 91 ### ## ##');

        row = {
            name,
            description,
            phone,
        };

        if (!isConsistent && i % 2) {
            const address = faker.address.city();
            row = {
                ...row,
                address,
            };
        }

        data = [...data, row];
    }

    return data;
};

export const dummyExport = () => {

};
