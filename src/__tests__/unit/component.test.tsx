import { render, screen, fireEvent } from "@testing-library/react";
// import {build, fake } from '@jackfranklin/test-data-bot';
import 'intersection-observer'; 
import { UserProvider } from "@/store/user";
import WithdrawModal from "@/components/balance/withdrawModal";
import DepositModal from "@/components/balance/depositModal";
import CountdownTimer from "@/components/balance/timer";

import Donut from "@/components/donut";

import Avatar from "@/components/icons/avatar";
const defaultWDProps = {
    timer: 30,
    isOpen: true,
    NGN: [{balance:"3000"}],
    setModalOpen: jest.fn(),
  };
const defaultCountDownProps = {
    timer: 30,
    setIsExpired: jest.fn()
}
const defaultAvatarProps = {
  src: "https://picsum.photos/200",
  alt: "alt_image",
  width: 70,
  height: 70,
  className: "",
  editBg: "https://picsum.photos/200",
  onClick: jest.fn()
}

// Avatar Component Test
describe('Avatar', () => {
    it('❌ renders Component correctly', () => { 
        const { asFragment } = render(<Avatar {...defaultAvatarProps}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});

// Donut Component Test
describe('Donut', () => {
    it('❌ renders Component correctly', () => { 
        const { asFragment } = render(
            <UserProvider>
        <Donut />
    </UserProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});


// CountDown Component Test
describe('CountdownTimer', () => {
    it('❌ renders Component correctly', () => { 
        const { asFragment } = render(<CountdownTimer {...defaultCountDownProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});


// Deposit Component Test
describe("DepositModal ", () => {

  const depositComponent = ()=> render(
    <UserProvider>
        <DepositModal {...defaultWDProps} />
    </UserProvider>
  );

  it("❌ renders Component correctly", () => {
    const { asFragment } = depositComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it(" ❌ count number of input in the form'", async() => {
    const {getAllByTestId} = depositComponent();
    const formInputs = getAllByTestId("form");
    expect(await formInputs).toHaveLength(4);
  });

  it(" ❌ Submit Form Data'", async() => {
    const {getByTestId, getByText, getAllByTestId, getByPlaceholderText} = depositComponent();

    const amount: any = getByPlaceholderText("Deposit Amount");
    fireEvent.change(amount, { target: { value: "1000" } });
    expect(amount.value).toBe("1000");

    const bank: any = getByPlaceholderText("Deposit Bank Name");
    fireEvent.change(bank, { target: { value: "GTB" } });
    expect(bank.value).toBe("GTB");

    const desc: any = getByPlaceholderText("Wallet Address");
    fireEvent.change(desc, { target: { value: "GRXISJSJ2DJ4H2N44NK2N2" } });
    expect(desc.value).toBe("GRXISJSJ2DJ4H2N44NK2N2");

    const accNum: any = getByPlaceholderText("Transaction Description");
    fireEvent.change(accNum, { target: { value: "TEST DESCRIPTION" } });
    expect(accNum.value).toBe("TEST DESCRIPTION");

    const button = getByTestId('submit_btn')
    fireEvent.click(button);
    expect(await getByText('Confirm Deposit')).toBeInTheDocument();
    // check for form two if it appears
    const formInputs = getAllByTestId("form_two");
    expect(await formInputs).toHaveLength(6);
   });

  
});

// Withdrwal Component Test

describe("Withdrawal Component", () => {
    // defining the component
    const testComponent = ()=> render(
        <UserProvider>
            <WithdrawModal {...defaultWDProps} />
        </UserProvider>
      );
  
    it(" ❌ renders Withdrawal Component correctly'", () => {
     const {asFragment} = testComponent();
     expect(asFragment()).toMatchSnapshot();
    });
  
    it(" ❌ count number of input in the form'", async () => {
      let component = testComponent();
      const formInputs = component.getAllByTestId('form')
      expect(await formInputs).toHaveLength(6);
     });

     it(" ❌ Submit Form Data'", async() => {
      const {getByTestId, getByText, getAllByTestId, getByPlaceholderText} = testComponent();
        // fill the form
        const amount:any = getByPlaceholderText('Withdraw Amount')
        fireEvent.change(amount,{target: {value: '1000'}})
        expect(amount.value).toBe('1000');

        const bank:any = getByPlaceholderText('Bank Name')
        fireEvent.change(bank,{target: {value: 'GTB'}})
        expect(bank.value).toBe('GTB');

        const desc:any = getByPlaceholderText('Transaction Description')
        fireEvent.change(desc,{target: {value: 'Test Desc'}})
        expect(desc.value).toBe('Test Desc');

        const accNum:any = getByPlaceholderText('Account Number')
        fireEvent.change(accNum,{target: {value: '0987654321'}})
        expect(accNum.value).toBe('0987654321');

        const accName:any = getByPlaceholderText('Account Name')
        fireEvent.change(accName,{target: {value: 'Daniel Olagunju'}})
        expect(accName.value).toBe('Daniel Olagunju');

        const phone:any = getByPlaceholderText('Phone Number');
        fireEvent.change(phone,{target: {value: '08012345678'}});
        expect(phone.value).toBe('08012345678');

        const button = getByTestId('submit_btn')
        fireEvent.click(button);
        expect(await getByText('Confirm Withdrawal')).toBeInTheDocument();
      // check for form two if it appears
        const formInputs = getAllByTestId("form_two");
        expect(await formInputs).toHaveLength(6);
     });
  });
