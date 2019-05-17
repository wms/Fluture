import {application1, application, future, alternative} from './internal/check';
import {FL} from './internal/const';
import {createTransformation} from './internal/transformation';
import {isFuture} from './future';

export var AltTransformation = createTransformation(1, 'alt', {
  rejected: function AltTransformation$rejected(){ return this.$1 }
});

export function alt(left){
  if(isFuture(left)){
    var context1 = application1(alt, future, arguments);
    return function alt(right){
      var context2 = application(2, alt, future, arguments, context1);
      return right._transform(new AltTransformation(context2, left));
    };
  }

  var context = application1(alt, alternative, arguments);
  return function alt(right){
    application(2, alt, alternative, arguments, context);
    return left[FL.alt](right);
  };
}
