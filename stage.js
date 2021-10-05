//You can use this file to test running code from cinder.js by calling execute('your code here', debug: boolean)
import {execute} from './cinder.js' //apparently this works somehow... I'm using node
execute('32 "even" "odd" 0 0 load 2 % 0 print 3 4 :A jump 2 print 0 0 :B jump :A 4 del 1 print :B')
