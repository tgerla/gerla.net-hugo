+++
date = '2026-02-01T09:14:00-05:00'
draft = true
title = 'Wireguard BLE Bridge'
+++

I have a large and complicated Home Assistant installation here at the house. It manages and aggregates a lot of things; small Bluetooth Low Energy (BLE) sensors throughout the house report temperature and humidity, the lights and the garage door are on automated timers.

We also have a small solar power system out at our [forest property](/projects/lovinhill/). I found myself wondering if it would be possible to proxy the BLE messages from the Victron MPPT controller and the battery's Battery Management System and stream them into my Home Assistant.

After considerable research, I decided to set up an LTE router at the remote site. I chose the Mikrotik Chateau LTE-6-US[^router]. It was inexpensive and had all of the basic features I needed: WiFi and an LTE modem. Based on my reading, it seemed like RouterOS was a very powerful but somewhat opaque configuration system. I figured I could handle it, having learned some fairly complicated networking in past careers.

I chatted with Claude for a while and got the networking going pretty easily. I am using WireGuard to create a tunnel between my Home Assistant VM's host server and the remote Chateau router and then using TailScale to expose the remote subnet to my home network. I have an open port forward on my home router to create the tunnel. I believe that if my remote device supported TailScale directly I could avoid this, but I haven't explored that option yet.

After configuring and testing at home, I took the router and BLE proxy (running ESPHome on an esp32 microcontroller) out to the remote site and fired it up. After manually adding the BLE proxy to Home Assistant (mDNSs discovery doesn't work across subnets), I immediately saw stats coming in from the Victron MPPT controller as well as the battery.

{{< figure src="ha-screenshot.png" alt="Home Assistant proxy stats" caption="BLE proxy data flowing through the WireGuard tunnel." >}}

[^router]: If I did it over again, I would probably have chosen the GL.iNet AX3000 instead, since it can run TailScale on-device.