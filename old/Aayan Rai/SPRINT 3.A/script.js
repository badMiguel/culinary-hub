// // JavaScript for Love and Favorite button interactions
// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelectorAll('.button.love, .button.favorite').forEach(button => {
//       button.addEventListener('click', function() {
//         let countSpan = this.querySelector('span');
//         countSpan.textContent = parseInt(countSpan.textContent) + 1;
//       });
//     });
  
//     // Filtering functionality
//     document.querySelectorAll('.filters select').forEach(select => {
//       select.addEventListener('change', function() {
//         const prepTimeFilter = document.getElementById('prep-time').value;
//         const allergensFilter = document.getElementById('allergens').value;
//         const dietaryRequirementsFilter = document.getElementById('dietary-requirements').value;
  
//         document.querySelectorAll('.card').forEach(card => {
//           const prepTime = parseInt(card.getAttribute('data-prep-time'), 10) || 0;
//           const allergens = card.getAttribute('data-allergens');
//           const dietaryRequirements = card.getAttribute('data-dietary-requirements');
  
//           const showCard = (!prepTimeFilter || prepTime <= parseInt(prepTimeFilter, 10)) &&
//                            (!allergensFilter || allergens === allergensFilter) &&
//                            (!dietaryRequirementsFilter || dietaryRequirements === dietaryRequirementsFilter);
  
//           card.style.display = showCard ? '' : 'none';
//         });
//       });
//     });
//   });
  