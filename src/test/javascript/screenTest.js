load("mock-ejax.js");
load("ejax-core-complete.js");
load("file.js");

var mockEjax;

function setUp() {
    ejax = null;
    mockEjax = new MockEjax();
    mockEjax.setPixel = function(c, x, y) {
        this.pixels = this.pixels || {};
        this.pixels[y] = this.pixels[y] || {};
        this.pixels[y][x] = c;
        this.pixels[y].maxX = this.pixels[y].maxX || 0;
        this.pixels[y].maxX = Math.max(x, this.pixels[y].maxX);
        this.pixels.maxY = this.pixels.maxY || 0;
        this.pixels.maxY = Math.max(y, this.pixels.maxY);
    };

    mockEjax.setPixels = function(str, x, y) {
        for (var i = 0; i < str.length; i++) {
            this.setPixel(str.charAt(i), x + i, y);
        }
    };

    mockEjax.pixelRow = function(y) {
        if (y > this.pixels.maxY) {
            fail("" + y + " is outside the max y value of " + this.pixels.maxY);
        }

        var result = "";
        var row = this.pixels[y];

        for (var x = 0; x <= row.maxX; x++) {
            result += row[x];
        }

        return result;
    };
}

function testScreenContent() {
    mockEjax.ejax.setBufferContent("abc\n123\nxyz\n\ndef\n\n456\n");
    mockEjax.ejax.screen.hardRedraw();
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row  0", "abc                                                                             ", mockEjax.pixelRow(0));
    assertEquals("Screen row  1", "123                                                                             ", mockEjax.pixelRow(1));
    assertEquals("Screen row  2", "xyz                                                                             ", mockEjax.pixelRow(2));
    assertEquals("Screen row  3", "                                                                                ", mockEjax.pixelRow(3));
    assertEquals("Screen row  4", "def                                                                             ", mockEjax.pixelRow(4));
    assertEquals("Screen row  5", "                                                                                ", mockEjax.pixelRow(5));
    assertEquals("Screen row  6", "456                                                                             ", mockEjax.pixelRow(6));
    assertEquals("Screen row  7", "                                                                                ", mockEjax.pixelRow(7));
    assertEquals("Screen row  8", "                                                                                ", mockEjax.pixelRow(8));
    assertEquals("Screen row  9", "                                                                                ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 11", "                                                                                ", mockEjax.pixelRow(11));
    assertEquals("Screen row 12", "                                                                                ", mockEjax.pixelRow(12));
    assertEquals("Screen row 13", "                                                                                ", mockEjax.pixelRow(13));
    assertEquals("Screen row 14", "                                                                                ", mockEjax.pixelRow(14));
    assertEquals("Screen row 15", "                                                                                ", mockEjax.pixelRow(15));
    assertEquals("Screen row 16", "                                                                                ", mockEjax.pixelRow(16));
    assertEquals("Screen row 17", "                                                                                ", mockEjax.pixelRow(17));
    assertEquals("Screen row 18", "                                                                                ", mockEjax.pixelRow(18));
    assertEquals("Screen row 19", "                                                                                ", mockEjax.pixelRow(19));
    assertEquals("Screen row 20", "                                                                                ", mockEjax.pixelRow(20));
    assertEquals("Screen row 21", "                                                                                ", mockEjax.pixelRow(21));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
}

function testScreenAfterStartingCommand() {
    mockEjax.ejax.screen.hardRedraw();
    mockEjax.onKeyDown({ keyCode: 88, ctrl: true, alt: false, shift: false });
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "C-x-                                                                            ", mockEjax.pixelRow(23));
}

function testScreenAfterCallingInvalidCommand() {
    mockEjax.ejax.screen.hardRedraw();
    mockEjax.onKeyDown({ keyCode: 88, ctrl: true, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 72, ctrl: true, alt: false, shift: false });
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "C-xC-h is undefined                                                             ", mockEjax.pixelRow(23));
}

function testScreenAfterCallingInvalidCommandThenTyping() {
    mockEjax.ejax.screen.hardRedraw();
    mockEjax.onKeyDown({ keyCode: 88, ctrl: true, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 72, ctrl: true, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 72, ctrl: false, alt: false, shift: false });
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row  0", "h                                                                               ", mockEjax.pixelRow(0));
    assertEquals("Screen row  1", "                                                                                ", mockEjax.pixelRow(1));
    assertEquals("Screen row  2", "                                                                                ", mockEjax.pixelRow(2));
    assertEquals("Screen row  3", "                                                                                ", mockEjax.pixelRow(3));
    assertEquals("Screen row  4", "                                                                                ", mockEjax.pixelRow(4));
    assertEquals("Screen row  5", "                                                                                ", mockEjax.pixelRow(5));
    assertEquals("Screen row  6", "                                                                                ", mockEjax.pixelRow(6));
    assertEquals("Screen row  7", "                                                                                ", mockEjax.pixelRow(7));
    assertEquals("Screen row  8", "                                                                                ", mockEjax.pixelRow(8));
    assertEquals("Screen row  9", "                                                                                ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 11", "                                                                                ", mockEjax.pixelRow(11));
    assertEquals("Screen row 12", "                                                                                ", mockEjax.pixelRow(12));
    assertEquals("Screen row 13", "                                                                                ", mockEjax.pixelRow(13));
    assertEquals("Screen row 14", "                                                                                ", mockEjax.pixelRow(14));
    assertEquals("Screen row 15", "                                                                                ", mockEjax.pixelRow(15));
    assertEquals("Screen row 16", "                                                                                ", mockEjax.pixelRow(16));
    assertEquals("Screen row 17", "                                                                                ", mockEjax.pixelRow(17));
    assertEquals("Screen row 18", "                                                                                ", mockEjax.pixelRow(18));
    assertEquals("Screen row 19", "                                                                                ", mockEjax.pixelRow(19));
    assertEquals("Screen row 20", "                                                                                ", mockEjax.pixelRow(20));
    assertEquals("Screen row 21", "                                                                                ", mockEjax.pixelRow(21));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
}

function testReadingParameterToLoadFile() {
    var currentX, currentY, loadedFilename;
    mockEjax.setCursor = function(x, y) {
        currentX = x;
        currentY = y;
    };
    mockEjax.file = function(filename) {
        loadedFilename = filename;
        return new File("src/test/javascript/testFile.txt");
    };
    mockEjax.ejax.setBufferContent("abc\n123\nxyz\n\ndef\n\n456\n");
    mockEjax.onKeyDown({ keyCode: 88, ctrl: true, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 70, ctrl: true, alt: false, shift: false });
    assertEquals("X cursor after C-xC-f", 11, currentX);
    assertEquals("Y cursor after C-xC-f", 23, currentY);
    mockEjax.ejax.screen.hardRedraw();
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "Find file:                                                                      ", mockEjax.pixelRow(23));

    mockEjax.onKeyDown({ keyCode: 84, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 69, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 83, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 84, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 70, ctrl: false, alt: false, shift: true });
    mockEjax.onKeyDown({ keyCode: 73, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 8, ctrl: false, alt: false, shift: false }); // backspace
    mockEjax.onKeyDown({ keyCode: 73, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 76, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 69, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 37, ctrl: false, alt: false, shift: false }); // left
    mockEjax.onKeyDown({ keyCode: 46, ctrl: false, alt: false, shift: false }); // delete
    mockEjax.onKeyDown({ keyCode: 69, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 190, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 84, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 88, ctrl: false, alt: false, shift: false });
    mockEjax.onKeyDown({ keyCode: 84, ctrl: false, alt: false, shift: false });
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "Find file: testFile.txt                                                         ", mockEjax.pixelRow(23));
    assertEquals("X cursor after typing filename", 23, currentX);
    assertEquals("Y cursor after typing filename", 23, currentY);

    mockEjax.onKeyDown({ keyCode: 13, ctrl: false, alt: false, shift: false });
    assertEquals("The loaded filename", "testFile.txt", loadedFilename);
    assertEquals("Max y value", 23, mockEjax.pixels.maxY);
    assertEquals("Screen row  0", "abc                                                                             ", mockEjax.pixelRow(0));
    assertEquals("Screen row  1", "123                                                                             ", mockEjax.pixelRow(1));
    assertEquals("Screen row  2", "                                                                                ", mockEjax.pixelRow(2));
    assertEquals("Screen row  3", "                                                                                ", mockEjax.pixelRow(3));
    assertEquals("Screen row  4", "                                                                                ", mockEjax.pixelRow(4));
    assertEquals("Screen row  5", "                                                                                ", mockEjax.pixelRow(5));
    assertEquals("Screen row  6", "                                                                                ", mockEjax.pixelRow(6));
    assertEquals("Screen row  7", "                                                                                ", mockEjax.pixelRow(7));
    assertEquals("Screen row  8", "                                                                                ", mockEjax.pixelRow(8));
    assertEquals("Screen row  9", "                                                                                ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 11", "                                                                                ", mockEjax.pixelRow(11));
    assertEquals("Screen row 12", "                                                                                ", mockEjax.pixelRow(12));
    assertEquals("Screen row 13", "                                                                                ", mockEjax.pixelRow(13));
    assertEquals("Screen row 14", "                                                                                ", mockEjax.pixelRow(14));
    assertEquals("Screen row 15", "                                                                                ", mockEjax.pixelRow(15));
    assertEquals("Screen row 16", "                                                                                ", mockEjax.pixelRow(16));
    assertEquals("Screen row 17", "                                                                                ", mockEjax.pixelRow(17));
    assertEquals("Screen row 18", "                                                                                ", mockEjax.pixelRow(18));
    assertEquals("Screen row 19", "                                                                                ", mockEjax.pixelRow(19));
    assertEquals("Screen row 20", "                                                                                ", mockEjax.pixelRow(20));
    assertEquals("Screen row 21", "                                                                                ", mockEjax.pixelRow(21));
    assertEquals("Screen row 22", " testFile.txt    (Fundamental)--------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
}

function testScrollingVertically() {
    var currentX, currentY;
    mockEjax.setCursor = function(x, y) {
        currentX = x;
        currentY = y;
    };
    var content = "";

    for (var i = 1; i < 100; i++) {
        content += "" + i + "\n";
    }

    var assertContent = function(startValue) {
        for (var i = 0; i < 21; i++) {
            var line = "" + (i + startValue);

            while (line.length < 80) {
                line += " ";
            }

            assertEquals("Screen row  " + i, line, mockEjax.pixelRow(i));
        }

        assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
        assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
    };

    mockEjax.ejax.setBufferContent(content);
    mockEjax.ejax.screen.hardRedraw();
    assertContent(1);

    for (var i = 0; i < 21; i++) {
        mockEjax.onKeyDown({ keyCode: 40, ctrl: false, alt: false, shift: false });
    }

    assertEquals("X cursor after moving down 21 times", 0, currentX);
    assertEquals("Y cursor after moving down 21 times", 21, currentY);
    mockEjax.onKeyDown({ keyCode: 40, ctrl: false, alt: false, shift: false });
    assertContent(17);
    assertEquals("X cursor after moving down 22 times", 0, currentX);
    assertEquals("Y cursor after moving down 22 times", 6, currentY);

    for (var i = 0; i < 7; i++) {
        mockEjax.onKeyDown({ keyCode: 38, ctrl: false, alt: false, shift: false });
    }

    assertContent(1);
    assertEquals("X cursor after moving up 7 times", 0, currentX);
    assertEquals("Y cursor after moving up 7 times", 15, currentY);
}

function testScrollingHorizontally() {
    var currentX, currentY;
    mockEjax.setCursor = function(x, y) {
        currentX = x;
        currentY = y;
    };
    var content = "";

    var line = function(size) {
        for (var i = 0; i < size; i++) {
            content += "" + (i % 10);
        }

        content += "\n";
    };

    line(120);
    line(100);
    line(90);
    line(81);
    line(80);
    line(79);
    line(30);
    content += "\nabc\n\n";
    mockEjax.ejax.setBufferContent(content);
    mockEjax.ejax.screen.hardRedraw();

    assertEquals("Screen row 0", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(0));
    assertEquals("Screen row 1", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(1));
    assertEquals("Screen row 2", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(2));
    assertEquals("Screen row 3", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(3));
    assertEquals("Screen row 4", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(4));
    assertEquals("Screen row 5", "0123456789012345678901234567890123456789012345678901234567890123456789012345678 ", mockEjax.pixelRow(5));
    assertEquals("Screen row 6", "012345678901234567890123456789                                                  ", mockEjax.pixelRow(6));
    assertEquals("Screen row 7", "                                                                                ", mockEjax.pixelRow(7));
    assertEquals("Screen row 8", "abc                                                                             ", mockEjax.pixelRow(8));
    assertEquals("Screen row 9", "                                                                                ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));

    for (var i = 0; i < 78; i++) {
        mockEjax.onKeyDown({ keyCode: 39, ctrl: false, alt: false, shift: false });
    }

    assertEquals("Screen row 0", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(0));
    assertEquals("Screen row 1", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(1));
    assertEquals("Screen row 2", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(2));
    assertEquals("Screen row 3", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(3));
    assertEquals("Screen row 4", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(4));
    assertEquals("Screen row 5", "0123456789012345678901234567890123456789012345678901234567890123456789012345678 ", mockEjax.pixelRow(5));
    assertEquals("Screen row 6", "012345678901234567890123456789                                                  ", mockEjax.pixelRow(6));
    assertEquals("Screen row 7", "                                                                                ", mockEjax.pixelRow(7));
    assertEquals("Screen row 8", "abc                                                                             ", mockEjax.pixelRow(8));
    assertEquals("Screen row 9", "                                                                                ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
    assertEquals("X cursor after moving right 78 times", 78, currentX);
    assertEquals("Y cursor after moving right 78 times", 0, currentY);

    mockEjax.onKeyDown({ keyCode: 39, ctrl: false, alt: false, shift: false });
    assertEquals("Screen row 0", "$12345678901234567890123456789012345678901234567890123456789                    ", mockEjax.pixelRow(0));
    assertEquals("Screen row 1", "$123456789012345678901234567890123456789                                        ", mockEjax.pixelRow(1));
    assertEquals("Screen row 2", "$12345678901234567890123456789                                                  ", mockEjax.pixelRow(2));
    assertEquals("Screen row 3", "$12345678901234567890                                                           ", mockEjax.pixelRow(3));
    assertEquals("Screen row 4", "$1234567890123456789                                                            ", mockEjax.pixelRow(4));
    assertEquals("Screen row 5", "$123456789012345678                                                             ", mockEjax.pixelRow(5));
    assertEquals("Screen row 6", "$                                                                               ", mockEjax.pixelRow(6));
    assertEquals("Screen row 7", "$                                                                               ", mockEjax.pixelRow(7));
    assertEquals("Screen row 8", "$                                                                               ", mockEjax.pixelRow(8));
    assertEquals("Screen row 9", "$                                                                               ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
    assertEquals("X cursor after moving right 79 times", 19, currentX);
    assertEquals("Y cursor after moving right 79 times", 0, currentY);

    for (var i = 0; i < 18; i++) {
        mockEjax.onKeyDown({ keyCode: 37, ctrl: false, alt: false, shift: false });
    }

    assertEquals("Screen row 0", "$12345678901234567890123456789012345678901234567890123456789                    ", mockEjax.pixelRow(0));
    assertEquals("Screen row 1", "$123456789012345678901234567890123456789                                        ", mockEjax.pixelRow(1));
    assertEquals("Screen row 2", "$12345678901234567890123456789                                                  ", mockEjax.pixelRow(2));
    assertEquals("Screen row 3", "$12345678901234567890                                                           ", mockEjax.pixelRow(3));
    assertEquals("Screen row 4", "$1234567890123456789                                                            ", mockEjax.pixelRow(4));
    assertEquals("Screen row 5", "$123456789012345678                                                             ", mockEjax.pixelRow(5));
    assertEquals("Screen row 6", "$                                                                               ", mockEjax.pixelRow(6));
    assertEquals("Screen row 7", "$                                                                               ", mockEjax.pixelRow(7));
    assertEquals("Screen row 8", "$                                                                               ", mockEjax.pixelRow(8));
    assertEquals("Screen row 9", "$                                                                               ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
    assertEquals("X cursor after moving left 18 times", 1, currentX);
    assertEquals("Y cursor after moving left 18 times", 0, currentY);

    mockEjax.onKeyDown({ keyCode: 37, ctrl: false, alt: false, shift: false });
    assertEquals("Screen row 0", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(0));
    assertEquals("Screen row 1", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(1));
    assertEquals("Screen row 2", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(2));
    assertEquals("Screen row 3", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(3));
    assertEquals("Screen row 4", "0123456789012345678901234567890123456789012345678901234567890123456789012345678$", mockEjax.pixelRow(4));
    assertEquals("Screen row 5", "0123456789012345678901234567890123456789012345678901234567890123456789012345678 ", mockEjax.pixelRow(5));
    assertEquals("Screen row 6", "012345678901234567890123456789                                                  ", mockEjax.pixelRow(6));
    assertEquals("Screen row 7", "                                                                                ", mockEjax.pixelRow(7));
    assertEquals("Screen row 8", "abc                                                                             ", mockEjax.pixelRow(8));
    assertEquals("Screen row 9", "                                                                                ", mockEjax.pixelRow(9));
    assertEquals("Screen row 10", "                                                                                ", mockEjax.pixelRow(10));
    assertEquals("Screen row 22", " *scratch*    (Fundamental)-----------------------------------------------------", mockEjax.pixelRow(22));
    assertEquals("Screen row 23", "                                                                                ", mockEjax.pixelRow(23));
    assertEquals("X cursor after moving left 19 times", 60, currentX);
    assertEquals("Y cursor after moving left 19 times", 0, currentY);
}
