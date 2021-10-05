//You can use this file to test running code from cinder.js by calling execute('your code here', debug: boolean)
import {execute} from './cinder.js' //apparently this works somehow... I'm using node
execute('50 0 0 [0] "s" :A :C 4 del 1 load 1 + 1 store 0 load 1 load % 2 4 :A notjump 0 1 :B jump 1 print 1 load 3 3 arrlen storeelement 2 2 :C jump :B 3 0 delelement 3 print', false)
