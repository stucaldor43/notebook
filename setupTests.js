import 'regenerator-runtime/runtime';
import "@testing-library/jest-dom";
import { configure } from '@testing-library/dom'
import "jest-localstorage-mock";

configure({
  asyncUtilTimeout: 3000
});
