serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    UartRxStr = serial.readUntil(serial.delimiters(Delimiters.NewLine)).split(" ")
    LL = parseFloat(UartRxStr[1])
    RR = parseFloat(UartRxStr[2])
    pins.analogWritePin(AnalogPin.P0, LL)
    pins.analogWritePin(AnalogPin.P1, RR)
})
radio.onReceivedString(function (receivedString) {
    led.unplot(x, y)
    BtRxStr = receivedString.split(",")
    x = parseFloat(BtRxStr[0])
    y = parseFloat(BtRxStr[1])
    led.plot(x, y)
    if (x != x0 || y != y0) {
        serial.writeLine("R " + convertToText(x * 25) + " " + convertToText(y * 25))
        x0 = x
        y0 = y
    }
})
/**
 * STMへ送受信
 * 
 * P15:Tx ー＞Ｒ 50 50
 * 
 * P14:Rx
 */
let BtRxStr: string[] = []
let y = 0
let x = 0
let RR = 0
let LL = 0
let UartRxStr: string[] = []
let y0 = 0
let x0 = 0
radio.setGroup(1)
serial.redirect(
SerialPin.P15,
SerialPin.P14,
BaudRate.BaudRate115200
)
serial.setTxBufferSize(32)
serial.setRxBufferSize(32)
x0 = 2
y0 = 2
serial.writeLine("R 50 50")
