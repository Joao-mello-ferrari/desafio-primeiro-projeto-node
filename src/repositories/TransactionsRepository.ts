import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface newTransaction {
  title: string,
  value: number, 
  type: "income" | "outcome"
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((accumulator: Balance, current: Transaction)=>{
      switch(current.type){
        case "income":
          accumulator.income += current.value
          accumulator.total += current.value
          break
        case "outcome":
          accumulator.outcome += current.value
          accumulator.total -= current.value
          break          
        default:
          break;
      }

      return accumulator
    },{
      income: 0,
      outcome: 0,
      total: 0
    })

    return balance
  }

  public create({title, value, type}: newTransaction): Transaction {
    const newTrasaction = new Transaction({title, value, type})
    
    this.transactions.push(newTrasaction)

    return newTrasaction
  }
}

export default TransactionsRepository;
