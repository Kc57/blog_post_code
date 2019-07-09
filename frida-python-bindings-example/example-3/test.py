import frida
import os
import sys
import argparse

def on_message(message, data):
    try:
        if message:
            print(message)
            # if message['type'] == 'send':
                # print('[ ] Received message in python: {0}'.format(message['payload']))

    except Exception as e:
        print('exception: ' + e)


def parse_hook(filename):
    print('[*] Parsing hook: ' + filename)
    hook = open(filename, 'r')
    script = session.create_script(hook.read())
    script.on('message', on_message)
    script.load()


if __name__ == '__main__':
    try:
        parser = argparse.ArgumentParser()
        parser.add_argument('package', help='Spawn a new process and attach')
        parser.add_argument('script', help='Frida script to execute')
        args = parser.parse_args()


        print('[*] Spawning ' + args.package)
        pid = frida.get_usb_device().spawn(args.package)
        session = frida.get_usb_device().attach(pid)
        parse_hook(args.script)
        frida.get_usb_device().resume(pid)
        print('')
        sys.stdin.read()

    except KeyboardInterrupt:
        sys.exit(0)
