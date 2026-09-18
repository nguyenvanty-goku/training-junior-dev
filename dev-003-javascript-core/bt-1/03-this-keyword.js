// Bài 3: Từ khóa `this` trong JavaScript

// 1. Implicit Binding & Mất context `this`
const person = {
  name: 'Nguyễn Văn A',
  age: 25,
  greet() {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi.`);
  },
  greetDelayed() {
    // Regular function callback trong setTimeout bị mất context this
    setTimeout(function () {
      console.log('Unbound callback this.name:', this ? this.name : undefined);
    }, 100);

    // Arrow function giữ lexical this
    setTimeout(() => {
      console.log('Arrow function fix:', this.name);
    }, 200);

    // .bind(this) cố định context
    setTimeout(
      function () {
        console.log('.bind fix:', this.name);
      }.bind(this),
      300
    );
  }
};

person.greet();
person.greetDelayed();

// Gán phương thức vào biến độc lập khiến this bị unbound
const standaloneGreet = person.greet;
standaloneGreet();


// 2. Regular Function vs Arrow Function
const timerObj = {
  count: 0,
  startRegular() {
    console.log('Regular method count:', this.count);
  },
  arrowMethod: () => {
    // Arrow function ở object literal lấy this ở scope ngoài (global/module)
    console.log('Arrow method count:', this ? this.count : undefined);
  }
};

timerObj.startRegular();
timerObj.arrowMethod();


// 3. Explicit Binding (call, apply, bind)
function printInfo(skill1, skill2) {
  console.log(`Tên: ${this.name} | Role: ${this.role} | Skills: ${skill1}, ${skill2}`);
}

const userA = { name: 'Trần Thị B', role: 'Frontend Developer' };
const userB = { name: 'Lê Văn C', role: 'DevOps Engineer' };

// call: truyền danh sách tham số
printInfo.call(userA, 'React', 'Tailwind CSS');

// apply: truyền mảng tham số
printInfo.apply(userB, ['Docker', 'Kubernetes']);

// bind: trả về hàm mới cố định this
const boundPrintUserA = printInfo.bind(userA, 'TypeScript');
boundPrintUserA('Next.js');


// 4. Constructor Function (new Binding)
function Developer(name, mainTech) {
  this.name = name;
  this.mainTech = mainTech;
  this.describe = function () {
    return `${this.name} chuyên về ${this.mainTech}`;
  };
}

const dev1 = new Developer('Phạm Minh D', 'Fullstack React/Node');
console.log(dev1.describe());
