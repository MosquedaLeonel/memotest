/// <reference types="Cypress" />

const URL = '192.168.0.19:8080';
const CARDS_NUMBER = 16;

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('initial setup', () => {
        
        it('makes sure the score is zero', () => {
            cy.get('.score-indicator').should('contain.text', '00');
        })

        it('makes sure the dashboard is disabled', () => {
            cy.get('.board').find('.cards').should('have.class', 'disabled');
        });

        it('makes sure the instruction button works', () => {
            cy.get('#btn-instructions').click().then(() => {
                cy.get('#instructions').should('have.class', 'show');
            });
            cy.get('#btn-instructions').click().then(() => {
                cy.get('#instructions').should('not.have.class', 'show')
            });
        });
        
        it('makes sure the start button works', () => {
            cy.get('#btn-start').click().then( () => {
                cy.get('.board').find('.cards').should('have.class', 'enabled');
            });
        });

        it('makes sure the cards position are random', () => {
            cy.get('.cards img').then(cards => {
                let originalIds = [];
                cards.each((i, card) => {
                    originalIds.push(card.id);
                });

                cy.visit(URL);

                cy.get('#btn-start').click().then(() => {
                    let newIds = [];
                    cy.get('.cards img').then(newCards => {
                        newCards.each((i, card) => {
                            newIds.push(card.id);
                        });
                        cy.wrap(originalIds).should('not.deep.equal', newIds);
                    });
                });

            });
        });
    });

    describe('solve the game', () => {
        let pairMap, pairList, firstClick, lastClick;
        
        
        it('choose a wrong combination', () => {
            cy.get('.cards img').then(cards => {
                pairMap = getPairCards(cards);
                pairList = Object.values(pairMap);
                
                console.log(pairList);

                firstClick = pairList[0][0];
                lastClick = pairList[1][0];
                
                cy.get(firstClick).click();
                cy.get(lastClick).click().then(() => {
                    checkClasses(firstClick, lastClick, 'error');
                    cy.then(() => {
                        checkClasses(firstClick, lastClick, 'hidden-card');       
                    });
                });
            });
        });

        it('choose a successful combination', () => {
            firstClick = pairList[1][0];
            lastClick = pairList[1][1];

            cy.get(firstClick).click();
            cy.get(lastClick).click().then(() => {
                checkClasses(firstClick, lastClick, 'success')
                cy.then(() => {
                    checkClasses(firstClick, lastClick, 'show-card');
                    cy.then(() => {
                        checkClasses(firstClick.parentElement, lastClick.parentElement, 'disabled');
                    });
                });
            });
            
        });

        it('makes sure that the successful card combination cannot be chosen', () => {
            firstClick = pairList[2][0];
            lastClick = pairList[1][0];

            cy.get(firstClick).click()
            cy.get(lastClick).click().then(() => {
                cy.get(lastClick).should('not.have.class', 'highlight').and('not.have.class', 'error');
                lastClick = pairList[1][1];
                
                cy.get(lastClick).should('not.have.class', 'highlight').and('not.have.class', 'error');
                
                lastClick = pairList[2][1];
                cy.get(lastClick).click();
            });
        });

        it('solve the game', () => {
            cy.get('.hidden-card').should('have.length', CARDS_NUMBER - 4);

            pairList.forEach((pair) => {
                cy.wait(500)
                cy.get(pair[0]).click()
                cy.get(pair[1]).click()
            });

            cy.get('.show-card').should('have.length', CARDS_NUMBER);

            cy.get('#myModal').should('be.visible');
            const roundNumbers = CARDS_NUMBER / 2 + 1;
            cy.get('#score').
                should('be.visible').
                contains(roundNumbers);
        })
    })

})

function getPairCards(cards) {
    const pairs = {};
  
    cards.each((i, card) => {
      const nameCard = card.name;
  
      if (pairs[nameCard]) {
        pairs[nameCard].push(card);
      } else {
        pairs[nameCard] = [card];
      }
    });

    return pairs;
  }

  function checkClasses(element1, element2, className) {
    cy.get(element1).should('have.class', className);
    cy.get(element2).should('have.class', className);
  }

