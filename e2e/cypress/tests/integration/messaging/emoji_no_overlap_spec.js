// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// [#] indicates a test step (e.g. # Go to a page)
// [*] indicates an assertion (e.g. * Check the title)
// Use element ID when selecting an element. Create one if none.
// ***************************************************************

// Stage: @prod
// Group: @messaging

describe('Messaging', () => {
    before(() => {
        // # Login as test user and visit town-square
        cy.apiInitSetup({loginAfter: true}).then(({townSquareUrl}) => {
            cy.visit(townSquareUrl);
        });
    });

    it("MM-T165 Windows: Custom emoji don't overlap", () => {
        // # Post a message
        const emojis = '๐๐คฃ๐๐๐๐๐๐คจ๐๐๐๐ค๐๐๐คจ๐ซ๐ซ๐๐๐โน๏ธ๐คจ๐๐๐คช๐๐๐๐๐คจ๐๐ฉ๐คจ๐๐คจ๐๐ง๐๐คจ๐๐๐๐๐งโน๏ธ๐คฌ๐ฑ๐ณ๐คซ๐คซ๐ฅ๐ณ๐ค๐จ๐ค๐ข๐๐คข๐คข๐คข๐คฎ๐คฎ๐ช๐๐๐ค๐ด๐คญ๐ต๐๐ท๐ค๐ค๐๐จโ๐งโ๐ง๐จโ๐จโ๐งโ๐ฆ๐๐ฉโ๐ฆโ๐ฆ๐๐ฉโ๐งโ๐ฆ๐ ๐ฉโ๐ฆโ๐ฆ๐จโ๐ฆโ๐ฆ';
        cy.postMessage(emojis);

        cy.get('.emoticon').then((allEmoticons) => {
            for (let index = 0; index < allEmoticons.length - 1; index++) {
                const emoticon = allEmoticons[index];
                const emoticonToCompare = allEmoticons[index + 1];

                // * Compare emojis on same row not to have overlap
                if (emoticon.getBoundingClientRect().top === emoticonToCompare.getBoundingClientRect().top) {
                    cy.wrap(emoticon.getBoundingClientRect().right).should('be.lte', emoticonToCompare.getBoundingClientRect().left);
                }
            }
        });
    });
});
