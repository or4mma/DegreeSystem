import { describe, it, expect, beforeAll } from 'vitest';
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';

describe('university-degree-contract', () => {
  let chain: Chain;
  let deployer: Account;
  let university: Account;
  let student: Account;
  
  beforeAll(() => {
    chain = new Chain();
    [deployer, university, student] = chain.accounts.get('deployer', 'wallet_1', 'wallet_2');
  });
  
  it('should allow contract owner to register a university', () => {
    const block = chain.mineBlock([
      Tx.contractCall('university-degree-contract', 'register-university', [types.principal(university.address)], deployer.address)
    ]);
    expect(block.receipts[0].result).toBeOk();
  });
  
  it('should not allow non-owner to register a university', () => {
    const block = chain.mineBlock([
      Tx.contractCall('university-degree-contract', 'register-university', [types.principal(student.address)], university.address)
    ]);
    expect(block.receipts[0].result).toBeErr(100); // err-owner-only
  });
  
  it('should allow registered university to issue a degree', () => {
    const block = chain.mineBlock([
      Tx.contractCall('university-degree-contract', 'issue-degree', [types.principal(student.address), types.ascii('Bachelor of Science')], university.address)
    ]);
    expect(block.receipts[0].result).toBeOk();
  });
  
  it('should not allow unregistered university to issue a degree', () => {
    const block = chain.mineBlock([
      Tx.contractCall('university-degree-contract', 'issue-degree', [types.principal(student.address), types.ascii('Fake Degree')], student.address)
    ]);
    expect(block.receipts[0].result).toBeErr(101); // err-not-found
  });
  
  it('should allow anyone to verify a degree', () => {
    const block = chain.mineBlock([
      Tx.contractCall('university-degree-contract', 'verify-degree', [types.uint(0), types.principal(university.address), types.principal(student.address)], deployer.address)
    ]);
    expect(block.receipts[0].result).toBeOk(types.bool(true));
  });
  
  it('should return false for non-existent degree', () => {
    const block = chain.mineBlock([
      Tx.contractCall('university-degree-contract', 'verify-degree', [types.uint(999), types.principal(university.address), types.principal(student.address)], deployer.address)
    ]);
    expect(block.receipts[0].result).toBeOk(types.bool(false));
  });
});
