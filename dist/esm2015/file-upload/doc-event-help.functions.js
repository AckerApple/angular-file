export const isFileInput = function (elm) {
    const ty = elm.getAttribute('type');
    return elm.tagName.toLowerCase() === 'input' && ty && ty.toLowerCase() === 'file';
};
let initialTouchStartY = 0;
let initialTouchStartX = 0;
export const detectSwipe = function (evt) {
    var touches = evt.changedTouches || (evt.originalEvent && evt.originalEvent.changedTouches);
    if (touches) {
        if (evt.type === 'touchstart') {
            initialTouchStartX = touches[0].clientX;
            initialTouchStartY = touches[0].clientY;
            return true; // don't block event default
        }
        else {
            // prevent scroll from triggering event
            if (evt.type === 'touchend') {
                var currentX = touches[0].clientX;
                var currentY = touches[0].clientY;
                if ((Math.abs(currentX - initialTouchStartX) > 20) ||
                    (Math.abs(currentY - initialTouchStartY) > 20)) {
                    // 29JAN2021 Removed/moved to inverse condition.
                    //           Should be run during tap detection.
                    // evt.stopPropagation();
                    // if (evt.cancelable) {
                    //   evt.preventDefault();
                    // }
                    // 29JAN2021 Swipe detected should return true instead of false.
                    // return false;
                    // Swipe detected
                    return true;
                }
                // tap detected
                evt.stopPropagation();
                if (evt.cancelable) {
                    evt.preventDefault();
                }
            }
            // 29JAN2021 Non-swipe condition should return false instead of true.
            // return true;
            return false;
        }
    }
    return false;
};
export const createInvisibleFileInputWrap = function () {
    var fileElem = createFileInput();
    var label = document.createElement('label');
    label.innerHTML = 'upload';
    label.style.visibility = 'hidden';
    label.style.position = 'absolute';
    label.style.overflow = 'hidden';
    label.style.width = '0px';
    label.style.height = '0px';
    label.style.border = 'none';
    label.style.margin = '0px';
    label.style.padding = '0px';
    label.setAttribute('tabindex', '-1');
    //bindAttrToFileInput(fileElem, label);
    //generatedElems.push({el: elem, ref: label});
    label.appendChild(fileElem);
    //document.body.appendChild( label );
    return label;
};
export const createFileInput = function () {
    var fileElem = document.createElement('input');
    fileElem.type = "file";
    return fileElem;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLWV2ZW50LWhlbHAuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL2RvYy1ldmVudC1oZWxwLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsVUFBUyxHQUFPO0lBQ3pDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQztBQUNwRixDQUFDLENBQUE7QUFFRCxJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztBQUMzQixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztBQUMzQixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsVUFBUyxHQUFPO0lBQ3pDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxjQUFjLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUYsSUFBSSxPQUFPLEVBQUU7UUFDWCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQzdCLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDeEMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtTQUMxQzthQUFNO1lBQ0wsdUNBQXVDO1lBQ3ZDLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7Z0JBQzNCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDaEQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO29CQUNoRCxnREFBZ0Q7b0JBQ2hELGdEQUFnRDtvQkFDaEQseUJBQXlCO29CQUN6Qix3QkFBd0I7b0JBQ3hCLDBCQUEwQjtvQkFDMUIsSUFBSTtvQkFDSixnRUFBZ0U7b0JBQ2hFLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxlQUFlO2dCQUNmLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO29CQUNsQixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3RCO2FBQ0Y7WUFDRCxxRUFBcUU7WUFDckUsZUFBZTtZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUc7SUFDMUMsSUFBSSxRQUFRLEdBQUcsZUFBZSxFQUFFLENBQUE7SUFDaEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtJQUMxQixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUE7SUFDakMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQ2pDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQzFCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUMzQixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQzNCLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRW5DLHVDQUF1QztJQUN2Qyw4Q0FBOEM7SUFFOUMsS0FBSyxDQUFDLFdBQVcsQ0FBRSxRQUFRLENBQUUsQ0FBQTtJQUM3QixxQ0FBcUM7SUFFckMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUc7SUFDN0IsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxRQUFRLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQTtJQUNwQixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgaXNGaWxlSW5wdXQgPSBmdW5jdGlvbihlbG06YW55KXtcbiAgY29uc3QgdHkgPSBlbG0uZ2V0QXR0cmlidXRlKCd0eXBlJylcbiAgcmV0dXJuIGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgJiYgdHkgJiYgdHkudG9Mb3dlckNhc2UoKSA9PT0gJ2ZpbGUnO1xufVxuXG5sZXQgaW5pdGlhbFRvdWNoU3RhcnRZID0gMDtcbmxldCBpbml0aWFsVG91Y2hTdGFydFggPSAwO1xuZXhwb3J0IGNvbnN0IGRldGVjdFN3aXBlID0gZnVuY3Rpb24oZXZ0OmFueSk6Ym9vbGVhbiB7XG4gIHZhciB0b3VjaGVzID0gZXZ0LmNoYW5nZWRUb3VjaGVzIHx8IChldnQub3JpZ2luYWxFdmVudCAmJiBldnQub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcyk7XG4gIGlmICh0b3VjaGVzKSB7XG4gICAgaWYgKGV2dC50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAgIGluaXRpYWxUb3VjaFN0YXJ0WCA9IHRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgIGluaXRpYWxUb3VjaFN0YXJ0WSA9IHRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBkb24ndCBibG9jayBldmVudCBkZWZhdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHByZXZlbnQgc2Nyb2xsIGZyb20gdHJpZ2dlcmluZyBldmVudFxuICAgICAgaWYgKGV2dC50eXBlID09PSAndG91Y2hlbmQnKSB7XG4gICAgICAgIHZhciBjdXJyZW50WCA9IHRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgdmFyIGN1cnJlbnRZID0gdG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICBpZiAoKE1hdGguYWJzKGN1cnJlbnRYIC0gaW5pdGlhbFRvdWNoU3RhcnRYKSA+IDIwKSB8fFxuICAgICAgICAgIChNYXRoLmFicyhjdXJyZW50WSAtIGluaXRpYWxUb3VjaFN0YXJ0WSkgPiAyMCkpIHtcbiAgICAgICAgICAvLyAyOUpBTjIwMjEgUmVtb3ZlZC9tb3ZlZCB0byBpbnZlcnNlIGNvbmRpdGlvbi5cbiAgICAgICAgICAvLyAgICAgICAgICAgU2hvdWxkIGJlIHJ1biBkdXJpbmcgdGFwIGRldGVjdGlvbi5cbiAgICAgICAgICAvLyBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gaWYgKGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgLy8gICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gMjlKQU4yMDIxIFN3aXBlIGRldGVjdGVkIHNob3VsZCByZXR1cm4gdHJ1ZSBpbnN0ZWFkIG9mIGZhbHNlLlxuICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAvLyBTd2lwZSBkZXRlY3RlZFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRhcCBkZXRlY3RlZFxuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyAyOUpBTjIwMjEgTm9uLXN3aXBlIGNvbmRpdGlvbiBzaG91bGQgcmV0dXJuIGZhbHNlIGluc3RlYWQgb2YgdHJ1ZS5cbiAgICAgIC8vIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUludmlzaWJsZUZpbGVJbnB1dFdyYXAgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZpbGVFbGVtID0gY3JlYXRlRmlsZUlucHV0KClcbiAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbGFiZWwuaW5uZXJIVE1MID0gJ3VwbG9hZCdcbiAgbGFiZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG4gIGxhYmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICBsYWJlbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gIGxhYmVsLnN0eWxlLndpZHRoID0gJzBweCdcbiAgbGFiZWwuc3R5bGUuaGVpZ2h0ID0gJzBweCdcbiAgbGFiZWwuc3R5bGUuYm9yZGVyID0gJ25vbmUnXG4gIGxhYmVsLnN0eWxlLm1hcmdpbiA9ICcwcHgnXG4gIGxhYmVsLnN0eWxlLnBhZGRpbmcgPSAnMHB4J1xuICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywnLTEnKVxuICBcbiAgLy9iaW5kQXR0clRvRmlsZUlucHV0KGZpbGVFbGVtLCBsYWJlbCk7XG4gIC8vZ2VuZXJhdGVkRWxlbXMucHVzaCh7ZWw6IGVsZW0sIHJlZjogbGFiZWx9KTtcblxuICBsYWJlbC5hcHBlbmRDaGlsZCggZmlsZUVsZW0gKVxuICAvL2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGxhYmVsICk7XG5cbiAgcmV0dXJuIGxhYmVsO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRmlsZUlucHV0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmaWxlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGZpbGVFbGVtLnR5cGU9XCJmaWxlXCJcbiAgcmV0dXJuIGZpbGVFbGVtO1xufVxuIl19