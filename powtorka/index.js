const Brand = "Pepe Jeans";

const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const age = 22;

export { add, substract, age };
export default Brand;

console.log("synchro 1");

const customers = new Promise((resolve, _) => {
  return Promise.resolve().then(() => {
    setTimeout(() => {
      resolve([
        { name: "Jamila", surname: "Harana" },
        { name: "Jakub", surname: "Wilczek" },
      ]);
    }, 2000);
  });
});

const addresses = new Promise((resolve, _) => {
  return Promise.resolve().then(() => {
    setTimeout(() => {
      resolve([
        { name: "state", surname: "Cancas" },
        { name: "state", surname: "Huston" },
      ]);
    }, 2000);
  });
});

// Running paraller

// Promise.all([customers, addresses])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch(new Error("Opps error"));

// Running paraller

// const fetchData = async () => {
//   const values = await Promise.all([customers, addresses]);
//   console.log(values);
// };
// fetchData();

// if there exists some dependencies

// const fetchData = async () => {
//   const c = await customers;
//   const a = await addresses;
//   console.log(c);
//   console.log(a);
// };
// fetchData();

console.log("synchro 2");
