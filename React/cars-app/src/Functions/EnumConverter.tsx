export function getFuelTypeName(type: number) {
    switch (type) {
      case 0: return "Petrol";
      case 1: return "Hybrid";
      case 2: return "Diesel";
      case 3: return "LPG";
      default: return 'Unknown';
    }
  }

 export  function getBodyTypeName(type:number){
    switch(type){
      case 0: return "Hatchback";
      case 1:return "Sedan";
      case 2: return "Kombi";
      case 3: return 'SUV';
      case 4: return "Roadster";
      default: return 'Unknown';
    }
  } 