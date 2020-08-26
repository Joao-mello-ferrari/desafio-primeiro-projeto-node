import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface newTransaction {
  title: string,
  value: number, 
  type: "income" | "outcome"
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: newTransaction): Transaction {
    const balance = this.transactionsRepository.getBalance().total

    if(type === "outcome" && balance - value < 0){
      throw new Error('There is not enough balance to withdrawal the suggested quantity')
    }

    const transaction = this.transactionsRepository.create({title, value, type})
    
    return transaction
   
  }
}

export default CreateTransactionService;
