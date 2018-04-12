import lxml.etree as ET
import time
import xml.etree.ElementTree as ElementTree
import requests

def strip_ns_prefix(tree):
        # xpath query for selecting all element nodes in namespace
            query = "descendant-or-self::*[namespace-uri()!='']"
                # for each element returned by the above xpath query...
                    for element in tree.xpath(query):
                                # replace element name with its local name
                                        print ET.QName(element).namespace
                                                element.tag = ET.QName(element).localname
                                                    return tree


                                                start_time = time.time()

                                                count = 0
                                                documents = []
                                                root = ET.parse("../dataMar-16-2018.xml")

                                                nsmap = {}
                                                # for ns in root.xpath('//namespace::*'):
                                                #
                                                #     if ns[0]:  # Removes the None namespace, neither needed nor supported.
                                                #         nsmap[ns[0]] = ns[1]
                                                all_good = 0
                                                not_good = 0
                                                headers = {'Content-Type': 'application/json'}
                                                print "A total of %s events:", len(root.xpath('////*[local-name()="event"]', namespaces=nsmap))
                                                for event in root.xpath('////*[local-name()="event"]', namespaces=nsmap):
                                                        try:
                                                                    r = requests.post("http://localhost:8080/eic-registry/resources", json={'payload': "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + ElementTree.tostring(event).decode(), 'payloadFormat': "xml", 'resourceTypeName': "event"}, headers=headers)
                                                                            print r.text
                                                                                    if r.status_code is 201:
                                                                                                    all_good+=1
                                                                                                            else:
                                                                                                                            not_good+=1
                                                                                                                                except Exception, e:
                                                                                                                                            print str(e)

                                                                                                                                            print "All good ma fren ", all_good
                                                                                                                                            print "No that gud ", not_good

