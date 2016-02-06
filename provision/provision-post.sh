#!/usr/bin/env bash

set -ex

# リポジトリルートのut.dumpをVM上のpostgresに読み込む
cd /vagrant && sudo -u postgres psql -h localhost -U ut -d ut < ut.dump
