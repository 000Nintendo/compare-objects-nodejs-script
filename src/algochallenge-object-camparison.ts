import { isEqual } from "lodash";

const objectNeedsToBeCheck = {
  first_name: "algo",
  second_name: "challenge",
  age: 24,
  gender: "male",
};

const comparisonObject = {
  address: {
    line_1: "address line 1",
    line_2: "address line 2",
    street: "line_1",
    house_no: "house_no",
    city: "city",
    state: "state",
    zip: "zip",
    country: "country",
  },
  family: {
    members_count: 3,
    female_count: 1,
    male_count: 2,
    members: [
      {
        first_name: "algo",
        second_name: "challenge",
        age: 24,
        gender: "male",
      },
      {
        first_name: "algo_1",
        second_name: "challenge_1",
        age: 35,
        gender: "female",
      },
      {
        first_name: "algo_2",
        second_name: "challenge_2",
        age: 40,
        gender: "male",
      },
    ],
  },
  more_details: {
    details: {
      members: [
        {
          first_name: "algo",
          second_name: "challenge",
          age: 24,
          gender: "male",
        },
        {
          first_name: "algo_1",
          second_name: "challenge_1",
          age: 35,
          gender: "female",
        },
      ],
    },
  },
};

type CheckObject = typeof objectNeedsToBeCheck;
type UnpredictableObject = typeof comparisonObject;

const isArray = (obj: Record<any, any>) => {
  return Array.isArray(obj);
};

const isObject = (obj: any) => {
  return typeof obj === "object";
};

let filteredArray: Record<any, any> = [];

const checkObject = (
  _checkObject: CheckObject,
  unpredictableObject:
    | Record<any, any>[]
    | Record<any, any>
    | UnpredictableObject
) => {
  if (isArray(unpredictableObject)) {
    for (let valueObj of unpredictableObject as Record<any, any>[]) {
      if (isObject(valueObj)) {
        const isObjectsAreSame = isEqual(_checkObject, valueObj);

        if (isObjectsAreSame) {
          filteredArray.push(valueObj);
          // return;
        } else {
          checkObject(_checkObject, valueObj);
        }
      }
    }
  }

  if (isObject(unpredictableObject)) {
    for (let objKey of Object.keys(unpredictableObject)) {
      const iteratorObj = (unpredictableObject as any)[objKey];
      checkObject(_checkObject, iteratorObj);
    }
  }
};

console.log("Started looking for Object");
console.log(`----------------------------`);
console.log(objectNeedsToBeCheck);
console.log("\n");

console.log("in comparing object");
console.log(`----------------------------`);
console.log(comparisonObject);
console.log("\n");

checkObject(objectNeedsToBeCheck, comparisonObject);

console.log(`----------------------------`);
console.log("Object search completed");
console.log(
  `Found ${filteredArray.length} same object instances in comparison object`
);
console.log(`----------------------------`);
console.log("\n");

console.log(`Results array`);
console.log(`----------------------------`);
console.log("\n");
console.log(filteredArray);
