import React from 'react';
import renderer from 'react-test-renderer';
import Item from '../components/Item';
import { render }  from '@testing-library/react-native';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

describe('Item Component', () => {
  test('Check if icon is present', () => {
    const { getByTestId } = render(<Item />);
    const trashIconElement = getByTestId('trash');
    const arrowIconElement = getByTestId('arrow-right');
    expect(trashIconElement).toBeTruthy();
    expect(arrowIconElement).toBeTruthy();
  });

  // describe('Item', () => {
  //   it("should received data", ()=>{
  //   const title = "Lab Laboratory Research";
  //   const date = new Date();
  //   const { getByTestId } = render(<Item myTitle={title}  myDate={date}/>);
  //   const component = getByTestId("item-component")

  //   expect(component.props.myTitle).toEqual(title);
  //   expect(component.props.myDate).toEqual(date);
  //   })
  // });
})


